<script>
	import { safeUrl } from '$lib/utils.js';

	let { src = '', alt = '', cls = 'ci-img' } = $props();

	let failed = $state(false);
	const resolved = $derived(failed ? '/assets/placeholder.svg' : safeUrl(src) || '/assets/placeholder.svg');
</script>

<img src={resolved} {alt} loading="lazy" class={cls} onerror={() => (failed = true)} />
