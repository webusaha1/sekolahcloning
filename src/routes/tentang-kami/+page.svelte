<script>
	import PageHeading from '$lib/PageHeading.svelte';
	import Photo from '$lib/Photo.svelte';

	let { data } = $props();
	const s = $derived(data.settings);
</script>

<PageHeading title="Profil Sekolah" subtitle="Mengenal {s.school_name}" />

<section class="section">
	<div class="container">
		<div id="profile-content" class="grid grid-md-2">
			<article>
				<h2 class="ci-title">Tentang Sekolah</h2>
				<p class="content-prose">{s.profile}</p>
				<h2 class="ci-title" style="margin-top:28px">Visi</h2>
				<p class="content-prose">{s.vision}</p>
				<h2 class="ci-title" style="margin-top:28px">Misi</h2>
				<p class="content-prose">{s.mission}</p>
			</article>
			<article class="contact-panel">
				{#if s.headmaster_photo}
					<Photo src={s.headmaster_photo} alt="Kepala sekolah" cls="detail-photo" />
				{/if}
				<h2 class="ci-title">Sambutan Kepala Sekolah</h2>
				<p class="content-prose">{s.headmaster_message}</p>
				<p style="margin-top:20px;font-weight:600">{s.headmaster_name}</p>
			</article>
		</div>
	</div>
</section>
