<script>
	import Photo from '$lib/Photo.svelte';
	import DemoLabel from '$lib/DemoLabel.svelte';

	let { row, demo = false } = $props();
</script>

<article class="card-guru">
	<div class="cg-img-wrap"><Photo src={row.Foto} alt={row.Nama} cls="cg-img" /></div>
	<DemoLabel {demo} />
	<h3>{row.Nama}</h3>
	<p style="color:var(--primary);margin-top:6px">{row.Jabatan}</p>
</article>
