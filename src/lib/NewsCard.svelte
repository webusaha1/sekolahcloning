<script>
	import Photo from '$lib/Photo.svelte';
	import DemoLabel from '$lib/DemoLabel.svelte';
	import { openDetail } from '$lib/modal.svelte.js';

	let { row, demo = false } = $props();
</script>

<article class="card-image">
	<div class="ci-img-wrap h-48"><Photo src={row.Foto} alt={row.Judul} /></div>
	<div class="ci-body">
		<DemoLabel {demo} />
		<p class="section-subtitle">{row.Tanggal} · {row.Penulis || 'Admin'}</p>
		<h2 class="ci-title">{row.Judul}</h2>
		<p class="ci-desc">{row.Ringkasan}</p>
		<button class="btn btn-outline" onclick={() => openDetail('Berita', row)}>Baca selengkapnya</button>
	</div>
</article>
