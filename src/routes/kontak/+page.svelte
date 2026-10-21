<script>
	import PageHeading from '$lib/PageHeading.svelte';
	import { safeUrl } from '$lib/utils.js';

	let { data } = $props();
	const s = $derived(data.settings);
	const wa = $derived(safeUrl(s.wa_link));
</script>

<PageHeading title="Hubungi Sekolah" subtitle="Informasi kontak dan penerimaan peserta didik" />

<section class="section">
	<div class="container">
		<div id="contact-content" class="contact-panel">
			<h2>{s.school_name}</h2>
			<p>Alamat: {s.address || 'Belum ditambahkan'}</p>
			<p>Telepon: {s.phone_number || 'Belum ditambahkan'}</p>
			<p>Email: {s.email_address || 'Belum ditambahkan'}</p>
			<p>Silakan hubungi pengelola sekolah untuk informasi penerimaan peserta didik.</p>
			{#if wa}
				<a class="btn btn-primary" href={wa} target="_blank" rel="noopener noreferrer">Hubungi melalui WhatsApp ↗</a>
			{:else}
				<p class="section-subtitle">Layanan kontak akan tersedia setelah data resmi diperbarui.</p>
			{/if}
		</div>
	</div>
</section>
