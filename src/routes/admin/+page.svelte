<script>
	import PageHeading from '$lib/PageHeading.svelte';
</script>

<PageHeading title="Login Admin" subtitle="Panel pengelola konten sekolah" />

<section class="section">
	<div class="container">
		<div class="contact-panel" style="max-width:480px">
			<h2 class="ci-title">Masuk sebagai pengelola</h2>
			<p class="section-subtitle">
				Halaman ini placeholder. Hubungkan ke Google Sheets / D1 / Supabase untuk panel admin yang
				sebenarnya.
			</p>
			<form onsubmit={(e) => e.preventDefault()} style="display:flex;flex-direction:column;gap:12px;margin-top:16px">
				<input class="search-box" type="email" placeholder="Email" aria-label="Email" autocomplete="username" />
				<input class="search-box" type="password" placeholder="Kata sandi" aria-label="Kata sandi" autocomplete="current-password" />
				<button class="btn btn-primary" type="submit">Masuk</button>
			</form>
		</div>
	</div>
</section>
