<script>
	import '../app.css';
	import { page } from '$app/state';
	import { safeUrl } from '$lib/utils.js';
	import Photo from '$lib/Photo.svelte';
	import { modal, closeDetail } from '$lib/modal.svelte.js';

	let { data, children } = $props();

	const s = $derived(data.settings);
	const origin = 'https://localhost';
	const logo = $derived(safeUrl(s.logo_url) || '/assets/logo.svg');
	const themeColor = $derived(/^#[\da-f]{6}$/i.test(s.theme_color) ? s.theme_color : '#0eb7e1');
	const phone = $derived(s.phone_number || 'Kontak belum diatur');
	const emailOk = $derived(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email_address || ''));
	const emailHref = $derived(emailOk ? 'mailto:' + s.email_address : '/kontak');
	const emailText = $derived(s.email_address || 'Email belum diatur');
	const waHref = $derived(safeUrl(s.wa_link) || '/kontak');
	const heroBg = $derived(safeUrl(s.hero_image));
	const path = $derived(page.url.pathname);

	let menuOpen = $state(false);
	let dialogEl = $state();
	let previousFocus;

	// Judul halaman (home: "Nama - Portal Resmi", lainnya: "Judul — Nama")
	const titles = {
		'/tentang-kami': 'Profil Sekolah',
		'/guru': 'Guru & Staf',
		'/berita': 'Berita Sekolah',
		'/kontak': 'Hubungi Sekolah',
		'/admin': 'Login Admin'
	};
	const pageTitle = $derived(
		titles[path] ? `${titles[path]} — ${s.school_name}` : `${s.school_name} - Portal Resmi`
	);
	const year = new Date().getFullYear();

	$effect(() => {
		if (!dialogEl) return;
		if (modal.open && !dialogEl.open) {
			previousFocus = document.activeElement;
			dialogEl.showModal();
			document.body.style.overflow = 'hidden';
		} else if (!modal.open && dialogEl.open) {
			dialogEl.close();
			document.body.style.overflow = '';
			previousFocus?.focus?.();
		}
	});

	function pdfPreview(link) {
		return link.replace(/\/view(?:\?.*)?$/, '/preview');
	}

	const pdf = $derived(modal.item ? safeUrl(modal.item.Link_PDF) : '');

	function onKey(e) {
		if (e.key === 'Escape') menuOpen = false;
	}
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta
		name="description"
		content="Portal SLB Negeri Mandailing Natal. Informasi sekolah, pengumuman, agenda, guru, fasilitas, dan prestasi."
	/>
	<meta name="theme-color" content={themeColor} />
	<link rel="icon" href={logo} />
	<link rel="apple-touch-icon" href={logo} />
	{@html `<style>:root{--primary:${themeColor}}</style>`}
</svelte:head>

<svelte:window onkeydown={onKey} />

<a class="skip-link" href="#main-content">Langsung ke konten</a>

<div class="topbar">
	<div class="topbar-left">
		<span class="wl-phone flex items-center"
			><i class="fas fa-phone-alt" style="margin-right: 0.5rem;"></i> {phone}</span
		>
		<a href={emailHref} class="wl-email-link flex items-center"
			><i class="far fa-envelope-open" style="margin-right: 0.5rem;"></i> {emailText}</a
		>
	</div>
	<div class="topbar-right">
		<a href="/guru">Staf</a>
		<a href="/#fasilitas">Fasilitas</a>
		<a href={waHref}>Info PPDB</a>
	</div>
</div>

<nav class="navbar">
	<div class="container nav-container">
		<a href="/" class="nav-logo">
			<img src={logo} alt="Logo Sekolah" class="wl-logo-img" />
		</a>

		<button
			id="mobile-menu-btn"
			aria-label="Buka menu"
			aria-controls="mobile-menu"
			aria-expanded={menuOpen}
			class="mobile-toggle"
			onclick={() => (menuOpen = !menuOpen)}><i class="fas fa-bars"></i></button
		>

		<div class="nav-links">
			<a href="/" class:active={path === '/'}>Beranda</a>
			<a href="/tentang-kami" class:active={path === '/tentang-kami'}>Profil </a>
			<a href="/#pengumuman">Pengumuman </a>
			<a href="/#ekstrakurikuler">Ekstrakurikuler</a>
			<a href="/#prestasi">Prestasi</a>
		</div>

		<div class="nav-actions">
			<a href={waHref} class="btn btn-primary"><i class="fas fa-phone-alt"></i> Hubungi</a>
			<a href="/admin" class="btn btn-outline"><i class="fas fa-sign-in-alt"></i> Log in</a>
		</div>
	</div>

	<div id="mobile-menu" class="mobile-menu" class:show={menuOpen}>
		<a
			href="/"
			onclick={() => (menuOpen = false)}
			style={path === '/' ? 'color: var(--primary); background: var(--gray-50);' : ''}>Beranda</a
		>
		<a href="/tentang-kami" onclick={() => (menuOpen = false)}>Profil</a>
		<a href="/#pengumuman" onclick={() => (menuOpen = false)}>Pengumuman</a>
		<a href="/#ekstrakurikuler" onclick={() => (menuOpen = false)}>Ekstrakurikuler</a>
		<a href="/#prestasi" onclick={() => (menuOpen = false)}>Prestasi</a>
		<div style="padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; background: var(--gray-50);">
			<a href={waHref} class="btn btn-primary w-full" style="text-align: center;" onclick={() => (menuOpen = false)}
				><i class="fas fa-phone-alt"></i> Hubungi</a
			>
			<a href="/admin" class="btn btn-outline w-full" style="text-align: center;" onclick={() => (menuOpen = false)}
				><i class="fas fa-sign-in-alt"></i> Log in</a
			>
		</div>
	</div>
</nav>

<main id="main-content">
	<div id="site-status" role="status">
		{#if data.isDemo}
			<div class="demo-note">
				Pratinjau desain · Data, logo, dan ilustrasi adalah contoh. Informasi resmi akan ditampilkan
				setelah diperbarui sekolah.
			</div>
		{:else if data.mode === 'unconfigured'}
			<div class="demo-note">Informasi sekolah sedang disiapkan.</div>
		{/if}
	</div>

	{@render children()}
</main>

<footer class="footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-col">
				<img src={logo} alt="Logo" class="wl-logo-img" style="height: 3rem; margin-bottom: 1rem;" />
				<h3 style="font-size: 1.25rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">
					{s.school_name}
				</h3>
				<p style="font-size: 0.875rem; color: var(--gray-500); margin-bottom: 1rem;">{s.tagline}</p>
				<div class="footer-contact">
					<span style="display: flex; align-items: center; gap: 0.75rem;"
						><i class="fas fa-phone-alt" style="color: var(--primary); width: 1rem; text-align: center;"></i>
						{phone}</span
					>
					<a href={waHref} style="display: flex; align-items: center; gap: 0.75rem; color: inherit; text-decoration: none;"
						><i class="fab fa-whatsapp" style="color: var(--primary); width: 1rem; text-align: center;"></i>
						{phone}</a
					>
					<a href={emailHref} style="display: flex; align-items: center; gap: 0.75rem; color: inherit; text-decoration: none;"
						><i class="far fa-envelope" style="color: var(--primary); width: 1rem; text-align: center;"></i>
						{emailText}</a
					>
				</div>
			</div>

			<div class="footer-col">
				<h4>Profil Sekolah</h4>
				<div class="footer-links">
					<a href="/tentang-kami"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Sambutan Kepala</a>
					<a href="/guru"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Staf & Guru</a>
					<a href="/tentang-kami"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Tentang Kami</a>
				</div>
			</div>

			<div class="footer-col">
				<h4>Informasi</h4>
				<div class="footer-links">
					<a href="/#pengumuman"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Pengumuman</a>
					<a href="/#agenda"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Agenda Kegiatan</a>
					<a href="/#prestasi"><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Prestasi</a>
					<a href={waHref}><i class="fas fa-chevron-right" style="font-size: 0.625rem; margin-right: 0.5rem; color: var(--gray-400);"></i> Info PPDB</a>
				</div>
			</div>

			<div class="footer-col">
				<h4>Temukan Kami</h4>
				<div class="social-links">
					{#if safeUrl(s.link_facebook)}
						<a href={safeUrl(s.link_facebook)} aria-label="Facebook" target="_blank" rel="noopener noreferrer" class="social-btn"><i class="fab fa-facebook-f"></i></a>
					{/if}
					{#if safeUrl(s.link_instagram)}
						<a href={safeUrl(s.link_instagram)} aria-label="Instagram" target="_blank" rel="noopener noreferrer" class="social-btn"><i class="fab fa-instagram"></i></a>
					{/if}
					{#if safeUrl(s.link_youtube)}
						<a href={safeUrl(s.link_youtube)} aria-label="YouTube" target="_blank" rel="noopener noreferrer" class="social-btn"><i class="fab fa-youtube"></i></a>
					{/if}
				</div>
			</div>
		</div>

		<div class="footer-bottom">
			<p>&copy; {year} <span>{s.school_name}</span>. All Rights Reserved.</p>
		</div>
	</div>
</footer>

<dialog
	bind:this={dialogEl}
	id="detail-dialog"
	class="modal-overlay"
	class:show={modal.open}
	aria-labelledby="dialog-title"
	oncancel={(e) => {
		e.preventDefault();
		closeDetail();
	}}
	onclick={(e) => {
		if (e.target === dialogEl) closeDetail();
	}}
>
	<div class="modal-content">
		<div class="modal-header">
			<h3 id="dialog-title">{modal.item?.Judul ?? 'Detail'}</h3>
			<button id="close-dialog" aria-label="Tutup detail" onclick={closeDetail}>&times;</button>
		</div>
		<div class="modal-body" id="dialog-body">
			{#if modal.item}
				{#if modal.type === 'Berita' && modal.item.Foto}
					<Photo src={modal.item.Foto} alt={modal.item.Judul} cls="detail-photo" />
				{/if}
				<p>{modal.item.Isi || modal.item.Ringkasan}</p>
				{#if pdf}
					<p style="margin:16px 0">
						<a class="btn btn-primary" href={pdf} target="_blank" rel="noopener noreferrer">Buka dokumen PDF ↗</a>
					</p>
					<iframe
						title="Dokumen pengumuman"
						sandbox="allow-scripts allow-same-origin"
						referrerpolicy="no-referrer"
						src={pdfPreview(pdf)}
					></iframe>
				{/if}
			{/if}
		</div>
	</div>
</dialog>
