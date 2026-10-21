# SLB Negeri Mandailing Natal — SvelteKit

Clone portal sekolah (SvelteKit + Svelte 5).

## Jalanin lokal
```
npm install
npm run dev
```

## Deploy
Upload ke GitHub, lalu connect ke Cloudflare Pages atau Vercel.
`adapter-auto` otomatis kedeteksi, jadi gak perlu config tambahan.

- Cloudflare Pages: framework preset **SvelteKit**, build command `npm run build`
- Vercel: auto detect SvelteKit

## Ganti data
Data ada di `src/lib/data.js` (fungsi `getContent()`), juga tersedia di `/api/content`.
Tinggal ganti isinya kalau mau ambil dari Google Sheets / D1 / Supabase.

Link lama `*.html` (mis. `/guru.html`) otomatis redirect ke route bersih lewat `src/hooks.server.js`.
