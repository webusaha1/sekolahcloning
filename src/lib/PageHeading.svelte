<script>
	let { title, subtitle = '' } = $props();
</script>

<section class="page-heading">
	<div class="container">
		<p style="font-size:0.875rem;opacity:.8;margin-bottom:8px">
			<a href="/">Beranda</a> / {title}
		</p>
		<h1>{title}</h1>
		{#if subtitle}<p>{subtitle}</p>{/if}
	</div>
</section>
