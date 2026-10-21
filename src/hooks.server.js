// Link lama gaya situs asli (guru.html, kontak.html, dst.) diarahkan ke route bersih.
export async function handle({ event, resolve }) {
	const { pathname, search } = event.url;
	if (pathname.endsWith('.html')) {
		let clean = pathname.slice(0, -5);
		if (clean === '/index') clean = '/';
		return new Response(null, { status: 301, headers: { location: clean + search } });
	}
	return resolve(event);
}
