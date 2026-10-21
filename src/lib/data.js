// Data konten (sama dengan respons /api/content situs asli, mode demo).
// Kalau nanti mau pakai Google Sheets / D1 / Supabase, cukup ganti isi fungsi getContent().

const stamp = '2026-10-18T00:00:00.000Z';
const base = { Published: 'true', updatedAt: stamp };

const facilities = ['Ruang Pembelajaran', 'Perpustakaan', 'Ruang Keterampilan'].map((Nama, i) => ({
	id: `demo-facility-${i}`,
	Nama,
	Foto: '/assets/placeholder.svg',
	Deskripsi: 'Contoh kategori fasilitas. Sesuaikan dengan fasilitas sekolah yang tersedia.',
	...base
}));

const clubs = ['Seni & Kreativitas', 'Olahraga', 'Keterampilan'].map((Nama, i) => ({
	id: `demo-club-${i}`,
	Nama,
	Foto: '/assets/placeholder.svg',
	Deskripsi:
		'Contoh program untuk pratinjau. Pengelola dapat menggantinya dengan kegiatan sekolah yang sebenarnya.',
	...base
}));

const settingsRaw = {
	school_name: 'SLB Negeri Mandailing Natal',
	tagline: 'Pusat informasi, transparansi, dan layanan digital sekolah.',
	theme_color: '#0eb7e1',
	logo_url: '/assets/logo.svg',
	hero_image: '',
	phone_number: '',
	wa_link: '',
	email_address: '',
	address: 'Mandailing Natal, Sumatera Utara',
	profile:
		'Selamat datang di portal SLB Negeri Mandailing Natal. Informasi resmi mengenai profil sekolah akan ditambahkan oleh pengelola.',
	vision: 'Visi resmi sekolah belum ditambahkan.',
	mission: 'Misi resmi sekolah belum ditambahkan.',
	headmaster_name: '',
	headmaster_message:
		'Sambutan kepala sekolah akan ditampilkan di sini setelah ditambahkan oleh pengelola.',
	link_facebook: '',
	link_instagram: '',
	link_youtube: '',
	headmaster_photo: ''
};

export const content = {
	Berita: [
		{
			id: 'demo-news',
			Judul: 'Selamat Datang di SLB Negeri Mandailing Natal',
			Ringkasan:
				'Ruang informasi dan layanan digital bagi keluarga besar sekolah. Kenali profil, kegiatan, serta informasi pendidikan melalui portal ini.',
			Isi: 'Ini adalah contoh tampilan berita. Pengelola dapat menggantinya dengan berita resmi melalui panel admin setelah Google Sheets terhubung.',
			Tanggal: 'Contoh konten',
			Penulis: 'Admin Sekolah',
			Foto: '/assets/placeholder.svg',
			...base
		}
	],
	Pengumuman: [
		{
			id: 'demo-announcement-1',
			Judul: 'Informasi Penerimaan Peserta Didik',
			Ringkasan:
				'Contoh pengumuman. Jadwal, persyaratan, dan layanan penerimaan peserta didik dapat ditambahkan oleh pengelola sekolah.',
			Tanggal: 'Menunggu informasi resmi',
			Link_PDF: '',
			...base
		},
		{
			id: 'demo-announcement-2',
			Judul: 'Informasi Kegiatan Pembelajaran',
			Ringkasan:
				'Contoh pengumuman. Dokumen dan informasi pembelajaran resmi akan tersedia setelah diperbarui oleh sekolah.',
			Tanggal: 'Menunggu informasi resmi',
			Link_PDF: '',
			...base
		}
	],
	Agenda: [
		{
			id: 'demo-agenda',
			NamaAcara: 'Agenda Kegiatan Sekolah',
			Tanggal: '—',
			BulanTahun: 'CONTOH',
			Waktu: 'Akan diumumkan',
			Lokasi: 'SLB Negeri Mandailing Natal',
			Deskripsi: 'Contoh agenda, bukan jadwal resmi.',
			...base
		}
	],
	Fasilitas: facilities,
	Ekstrakurikuler: clubs,
	Guru: [
		{
			id: 'demo-teacher',
			Nama: 'Nama Guru',
			Jabatan: 'Contoh data guru',
			Foto: '/assets/placeholder.svg',
			...base
		}
	],
	Prestasi: [
		{
			id: 'demo-achievement',
			Nama: 'Apresiasi Bakat Peserta Didik',
			Judul_Lomba: 'Contoh tampilan prestasi; belum merupakan pencapaian resmi sekolah.',
			Peringkat: '—',
			Bidang: 'Kreativitas',
			Kategori: 'Contoh',
			Foto: '/assets/placeholder.svg',
			...base
		}
	],
	settings: Object.entries(settingsRaw).map(([Key, Value], i) => ({
		id: `setting-${i}`,
		Key,
		Value,
		...base
	}))
};

export function getContent() {
	return { mode: 'live', source: 'static', data: content };
}
