// Hanya izinkan https:// atau /assets/ lokal (sama seperti situs asli)
export function safeUrl(value, origin = 'https://localhost') {
	try {
		const u = new URL(value, origin);
		const ok = u.protocol === 'https:' || (u.origin === origin && u.pathname.startsWith('/assets/'));
		if (!ok) return '';
		return u.origin === origin ? u.pathname + u.search : u.href;
	} catch {
		return '';
	}
}

export function toSettings(rows = []) {
	return Object.fromEntries(rows.map((r) => [r.Key, r.Value]));
}

export function isDemoData(content) {
	return Object.values(content).some((rows) => rows.some((r) => String(r.id).startsWith('demo-')));
}
