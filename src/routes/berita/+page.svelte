<script>
	import PageHeading from '$lib/PageHeading.svelte';
	import NewsCard from '$lib/NewsCard.svelte';

	let { data } = $props();

	let q = $state('');
	const rows = $derived(
		(data.content.Berita || []).filter((r) =>
			(r.Judul + ' ' + r.Ringkasan).toLocaleLowerCase('id').includes(q.toLocaleLowerCase('id'))
		)
	);
</script>

<PageHeading title="Berita Sekolah" subtitle="Informasi dan cerita terbaru dari sekolah" />

<section class="section">
	<div class="container">
		<div style="margin-bottom:24px">
			<input
				id="search"
				class="search-box"
				type="search"
				placeholder="Cari berita..."
				aria-label="Cari berita"
				bind:value={q}
			/>
		</div>
		<div id="all-berita" class="grid grid-sm-2 grid-lg-3">
			{#each rows as row (row.id)}
				<NewsCard {row} demo={data.isDemo} />
			{:else}
				<p class="empty-state">{q ? 'Berita tidak ditemukan.' : 'Belum ada berita.'}</p>
			{/each}
		</div>
	</div>
</section>
