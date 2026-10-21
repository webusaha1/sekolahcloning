<script>
	import Photo from '$lib/Photo.svelte';
	import DemoLabel from '$lib/DemoLabel.svelte';
	import TeacherCard from '$lib/TeacherCard.svelte';
	import { openDetail } from '$lib/modal.svelte.js';
	import { safeUrl } from '$lib/utils.js';

	let { data } = $props();

	const c = $derived(data.content);
	const s = $derived(data.settings);
	const demo = $derived(data.isDemo);
	const heroBg = $derived(safeUrl(s.hero_image));
	const featured = $derived(c.Berita?.[0]);
</script>

<section
	id="wl-hero-section"
	class="hero"
	style={heroBg ? `background-image:url("${heroBg.replaceAll('"', '%22')}")` : ''}
>
	<div class="hero-overlay"></div>
	<div class="container hero-content">
		<div class="hero-text">
			<p style="color: var(--white); font-size: 1.125rem; font-weight: 500; margin-bottom: 0.25rem;">
				Selamat Datang di Website
			</p>
			<h1 class="hero-title">{s.school_name}</h1>
			<p class="hero-desc">{s.tagline}</p>

			<div class="stats-box">
				<div class="stats-grid">
					<div class="stat-item"><div class="stat-num">{c.Prestasi?.length || 0}</div><div class="stat-label">PRESTASI</div></div>
					<div class="stat-item"><div class="stat-num">{c.Fasilitas?.length || 0}</div><div class="stat-label">FASILITAS</div></div>
					<div class="stat-item"><div class="stat-num">{c.Ekstrakurikuler?.length || 0}</div><div class="stat-label">EKSKUL</div></div>
					<div class="stat-item"><div class="stat-num">{c.Guru?.length || 0}</div><div class="stat-label">GURU</div></div>
				</div>
				<a href="/tentang-kami" class="stats-link">
					<i class="fas fa-arrow-right" style="font-size: 1.875rem;"></i>
					<div>
						<h3 style="font-size: 1.5rem; font-weight: 700; line-height: 1.2;">TENTANG</h3>
						<p style="font-size: 0.75rem;">{s.school_name}</p>
					</div>
				</a>
			</div>
		</div>

		<div class="hero-widget" id="api-berita-utama">
			<div class="widget-berita">
				<span class="widget-badge">◉ {demo ? 'Contoh Berita' : 'Berita Pendidikan'}</span>
				<h2 style="font-size:24px;margin-top:8px;line-height:1.3">{featured?.Judul || 'Selamat Datang'}</h2>
				<p style="font-size:14px;opacity:.85;margin:12px 0 24px">
					{featured?.Ringkasan ||
						'Temukan informasi terbaru mengenai kegiatan belajar mengajar di sekolah.'}
				</p>
				{#if featured}
					<div style="display:flex;justify-content:space-between;border-top:1px solid #ffffff33;padding:16px 0;font-size:12px">
						<span>✎ {featured.Penulis || 'Admin'}</span>
						<span>▦ {featured.Tanggal}</span>
					</div>
				{/if}
				<a href="/berita" class="btn" style="background:#ffffff22;color:white;border:1px solid #ffffff33;margin-top:auto">Lihat Semua Berita →</a>
			</div>
		</div>
	</div>
</section>

<section id="pengumuman" class="section">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Pengumuman</h2>
				<p class="section-subtitle">Menyajikan Publikasi Pengumuman Sekolah</p>
			</div>
		</div>
		<div id="api-pengumuman" class="grid grid-sm-2 grid-lg-4">
			{#each c.Pengumuman as row (row.id)}
				<article class="card-pengumuman">
					<div class="cp-icon"><i class="far fa-file-pdf" aria-hidden="true"></i></div>
					<DemoLabel {demo} />
					<p class="section-subtitle">ⓘ Detail Pengumuman</p>
					<h3 class="cp-title" style="margin-top:8px">{row.Judul}</h3>
					<p class="cp-desc">{row.Ringkasan}</p>
					<div class="cp-footer">
						<span class="section-subtitle">{row.Tanggal}</span>
						<button class="btn btn-outline" onclick={() => openDetail('Pengumuman', row)}>Lihat</button>
					</div>
				</article>
			{:else}
				<p class="empty-state">Belum ada pengumuman.</p>
			{/each}
		</div>
	</div>
</section>

<section id="agenda" class="section bg-white">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Agenda</h2>
				<p class="section-subtitle">Dapatkan informasi terkait semua kegiatan sekolah</p>
			</div>
		</div>
		<div id="api-agenda" class="grid grid-md-2 grid-lg-3">
			{#each c.Agenda as row (row.id)}
				<article class="card-agenda">
					<div class="ca-date">
						<div class="ca-day">{row.Tanggal}</div>
						<div class="ca-month">{row.BulanTahun}</div>
					</div>
					<div class="ca-info">
						<DemoLabel {demo} />
						<h3>{row.NamaAcara}</h3>
						<div class="ca-meta">
							<span>◷ {row.Waktu}</span>
							<span>⌖ {row.Lokasi}</span>
						</div>
					</div>
				</article>
			{:else}
				<p class="empty-state">Belum ada agenda.</p>
			{/each}
		</div>
	</div>
</section>

<section id="fasilitas" class="section">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Fasilitas</h2>
				<p class="section-subtitle">Fasilitas pendukung pembelajaran</p>
			</div>
		</div>
		<div id="api-fasilitas" class="grid grid-sm-2 grid-lg-3">
			{#each c.Fasilitas as row (row.id)}
				<article class="card-image">
					<div class="ci-img-wrap h-64">
						<Photo src={row.Foto} alt={row.Nama} />
						<div class="ci-overlay">
							<DemoLabel {demo} />
							<span style="color:var(--accent);font-size:11px;font-weight:700">FASILITAS</span>
							<h3 style="color:white;font-size:20px">{row.Nama}</h3>
						</div>
					</div>
					{#if row.Deskripsi}
						<div class="ci-body"><p class="ci-desc">{row.Deskripsi}</p></div>
					{/if}
				</article>
			{:else}
				<p class="empty-state">Belum ada fasilitas.</p>
			{/each}
		</div>
	</div>
</section>

<section id="ekstrakurikuler" class="section bg-white">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Ekstrakurikuler</h2>
				<p class="section-subtitle">Kembangkan bakat dan minat siswa</p>
			</div>
		</div>
		<div id="api-ekskul" class="grid grid-md-2 grid-lg-3">
			{#each c.Ekstrakurikuler.slice(0, 3) as row (row.id)}
				<article class="card-image">
					<div class="ci-img-wrap h-48"><Photo src={row.Foto} alt={row.Nama} /></div>
					<div class="ci-body">
						<DemoLabel {demo} />
						<h3 class="ci-title">{row.Nama}</h3>
						<p class="ci-desc">{row.Deskripsi}</p>
					</div>
				</article>
			{:else}
				<p class="empty-state">Belum ada ekstrakurikuler.</p>
			{/each}
		</div>
	</div>
</section>

<section id="guru" class="section">
	<div class="container">
		<div class="section-header">
			<div>
				<h2 class="section-title">Daftar Guru</h2>
				<p class="section-subtitle">Berkenalan dengan Guru & Staf yang Berdedikasi Tinggi.</p>
			</div>
			<a href="/guru" class="btn btn-primary">Lihat Semua <i class="fas fa-chevron-right" style="font-size: 0.75rem;"></i></a>
		</div>
		<div id="api-guru" class="grid grid-sm-2 grid-lg-4">
			{#each c.Guru.slice(0, 4) as row (row.id)}
				<TeacherCard {row} {demo} />
			{:else}
				<p class="empty-state">Belum ada data guru.</p>
			{/each}
		</div>
	</div>
</section>

<section id="prestasi" class="section bg-white">
	<div class="container">
		<div class="section-header text-center" style="align-items: center; display: block;">
			<h2 class="section-title">Prestasi</h2>
			<p class="section-subtitle">Mencetak banyak prestasi membanggakan</p>
		</div>
		<div id="api-prestasi" class="grid grid-md-2 grid-lg-3">
			{#each c.Prestasi.slice(0, 3) as row (row.id)}
				<article class="card-prestasi">
					<div class="cpr-img-wrap">
						<Photo src={row.Foto} alt={row.Nama} />
						<span class="cpr-badge">{row.Kategori || 'Prestasi'}</span>
					</div>
					<div class="cpr-body">
						<DemoLabel {demo} />
						<h3 class="ci-title">{row.Nama}</h3>
						<p class="ci-desc">{row.Judul_Lomba}</p>
						<div class="cpr-grid">
							<p>🏅 <span class="section-subtitle">Peringkat</span><br />{row.Peringkat}</p>
							<p>★ <span class="section-subtitle">Bidang</span><br />{row.Bidang}</p>
						</div>
					</div>
				</article>
			{:else}
				<p class="empty-state">Belum ada data prestasi.</p>
			{/each}
		</div>
	</div>
</section>
