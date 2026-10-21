import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// auto-detect: Cloudflare Pages / Vercel / dll
		adapter: adapter()
	}
};

export default config;
