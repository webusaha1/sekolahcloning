<script>
	import PageHeading from '$lib/PageHeading.svelte';
	import TeacherCard from '$lib/TeacherCard.svelte';

	let { data } = $props();

	let q = $state('');
	const rows = $derived(
		(data.content.Guru || []).filter((r) =>
			(r.Nama + ' ' + r.Jabatan).toLocaleLowerCase('id').includes(q.toLocaleLowerCase('id'))
		)
	);
</script>

<PageHeading title="Guru & Staf" subtitle="Berkenalan dengan pendidik yang berdedikasi" />

<section class="section">
	<div class="container">
		<div style="margin-bottom:24px">
			<input
				id="search"
				class="search-box"
				type="search"
				placeholder="Cari guru atau jabatan..."
				aria-label="Cari guru"
				bind:value={q}
			/>
		</div>
		<div id="all-guru" class="grid grid-sm-2 grid-lg-4">
			{#each rows as row (row.id)}
				<TeacherCard {row} demo={data.isDemo} />
			{:else}
				<p class="empty-state">{q ? 'Guru tidak ditemukan.' : 'Belum ada data guru.'}</p>
			{/each}
		</div>
	</div>
</section>
