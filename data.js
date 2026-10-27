/* Data tetap aplikasi Laporan Rondaan — Bahagian Penguatkuasa, Majlis Daerah Serian */

window.LAWS = {
  K: { bm: 'Undang-undang Kecil Pihak Berkuasa Tempatan (Kebersihan) 1999', cite: 'The Local Authorities (Cleanliness) By-Laws, 1999', prefix: 'Bylaw', short: 'Kebersihan 1999' },
  I: { bm: 'Undang-undang Kecil Pihak Berkuasa Tempatan (Iklan) 2012', cite: 'The Local Authorities (Advertisements) By-Laws, 2012', prefix: 'Bylaw', short: 'Iklan 2012' },
  O: { bm: 'Ordinan Pihak Berkuasa Tempatan 1996', cite: 'Local Authorities Ordinance, 1996', prefix: 'Seksyen', short: 'Ordinan PBT 1996' },
  C: { bm: 'Undang-undang Kecil Pihak Berkuasa Tempatan (Kompaun Kesalahan) 1999', cite: 'The Local Authorities (Compounding of Offences) By-Laws, 1999', prefix: 'Bylaw', short: 'Kompaun 1999' },
  P: { bm: 'Akta Pemberi Pinjam Wang 1951', cite: 'Akta Pemberi Pinjam Wang, 1951', prefix: '', short: 'Akta PPW 1951' },
  R: { bm: 'Undang-undang Kecil Refleksologi dan Pertubuhan Kesihatan 2009', cite: 'The Local Authorities (Reflexology and Health Establishments) By-Laws, 2009', prefix: 'Bylaw', short: 'Refleksologi 2009' },
  E: { bm: 'Undang-undang Kecil Hiburan (Pindaan) 2005', cite: 'The Entertainment (Amendment) By-Laws, 2005', prefix: 'Bylaw', short: 'Hiburan 2005' },
  H: { bm: 'Undang-undang Kecil Penjajaan Majlis Daerah Upper Sadong 1962', cite: 'Upper Sadong District Council (Hawking) By-Laws, 1962', prefix: 'Bylaw', short: 'Penjajaan 1962' },
  X: { bm: 'Lain-lain', cite: '', prefix: '', short: 'Lain-lain' }
};

/* Senarai pendek 11 kesalahan yang kerap digunakan */
window.SHORTLIST = [
  { id: 'S1', label: 'Cop parkir, barang di kawasan awam', cites: [['K', '18(1)(a)(b)']], butiran: 'Meletakkan barangan di kawasan awam (lot petak letak kereta) bagi tujuan "cop parkir"' },
  { id: 'S2', label: 'Buang sampah di tempat awam', cites: [['K', '18(1)(a)']], butiran: 'Membuang sampah secara terbuka di tempat awam' },
  { id: 'S3', label: 'Kenderaan terbiar', cites: [['K', '27(1)']], butiran: 'Meletakkan atau meninggalkan kenderaan terbiar di tempat awam', tindakan: 'larangan' },
  { id: 'S4', label: 'Gagal patuh notis alih kenderaan terbiar', cites: [['K', '27(4)(b)']], butiran: 'Gagal mematuhi notis mengalihkan kenderaan terbiar' },
  { id: 'S5', label: 'Papan tanda atau iklan tanpa permit', cites: [['I', '4']], butiran: 'Mempamerkan papan tanda atau iklan perniagaan tanpa kebenaran / tanpa permit daripada pihak Majlis' },
  { id: 'S6', label: 'Poster PPW (pinjaman wang tanpa lesen)', cites: [['I', '16(1)'], ['K', '22(1)(b)']], butiran: 'Menampal dan memasang poster iklan pinjaman wang tanpa lesen pada tiang lampu jalan dan papan tanda' },
  { id: 'S7', label: 'Barang di kaki lima', cites: [['K', '26(1)']], butiran: 'Meletakkan, mempamerkan atau menyimpan barangan di atas kaki lima' },
  { id: 'S8', label: 'Masak atau hidang makanan di kaki lima', cites: [['K', '26(2)']], butiran: 'Memasak, menyediakan atau menghidang makanan di kaki lima tanpa kebenaran pihak Majlis' },
  { id: 'S9', label: 'Semak samun di tanah persendirian', cites: [['K', '28(1)']], butiran: 'Gagal memotong dan menjaga tumbuhan di tanah persendirian sehingga menyebabkan kacau ganggu' },
  { id: 'S10', label: 'Buang sampah di tanah persendirian', cites: [['K', '13']], butiran: 'Membuang atau meletakkan sampah di tanah persendirian atau tanah orang lain' },
  { id: 'S11', label: 'Penjaja haram', cites: [['H', '3(1)']], butiran: 'Melakukan aktiviti berjaja tanpa kebenaran daripada pihak Majlis' }
];

/* Senarai anggota asal — boleh diubah dalam Tetapan */
window.DEFAULT_STAFF = [
  { id: 'a1', nama: 'Carlson anak Kennedy', jawatan: 'Penolong Pegawai Penguatkuasa, KP6' },
  { id: 'a2', nama: 'Danny Franklin Sidin', jawatan: 'Pembantu Penguatkuasa, KP2 (Hakiki)' },
  { id: 'a3', nama: 'Nawie anak Enggat', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a4', nama: 'Dominic anak Anggau', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a5', nama: 'Clayton anak Robert', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a6', nama: 'Elister Ryne Enggat anak Frederick', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a7', nama: 'Mark Hadde anak Dorine', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a8', nama: 'Wafiy Adha bin Wahab', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a9', nama: 'Adrian anak Egon', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a10', nama: 'Malvian Jun anak Fabian', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a11', nama: 'Allexzandro Juing anak Michael Wong', jawatan: 'Pembantu Penguatkuasa, KP1' },
  { id: 'a12', nama: 'Charlie anak Clement', jawatan: 'Pemandu, H11' },
  { id: 'a13', nama: 'Rexses anak Rosenthal', jawatan: 'Pembantu Khidmat Am, H1' }
];
window.DEFAULT_PENYEDIA = 'a6';

/* Jenis laporan (bahagian) */
window.REPORT_TYPES = {
  premis:    { label: 'Pemeriksaan premis', short: 'Premis', tone: 'green', icon: 'store' },
  permit:    { label: 'Pemeriksaan permit', short: 'Permit', tone: 'green', icon: 'badge' },
  kenderaan: { label: 'Kenderaan terbiar', short: 'Kenderaan', tone: 'blue', icon: 'car' },
  mesyuarat: { label: 'Mesyuarat / taklimat / kerja ukur', short: 'Mesyuarat', tone: 'gray', icon: 'users' },
  aduan:     { label: 'Aduan awam', short: 'Aduan', tone: 'amber', icon: 'message' },
  susulan:   { label: 'Pemeriksaan susulan', short: 'Susulan', tone: 'amber', icon: 'repeat' },
  ppw:       { label: 'PPW / iklan haram', short: 'PPW', tone: 'red', icon: 'poster' },
  bersepadu: { label: 'Operasi bersepadu', short: 'Bersepadu', tone: 'blue', icon: 'shield' },
  sitaan:    { label: 'Operasi sitaan', short: 'Sitaan', tone: 'red', icon: 'box' },
  kosong:    { label: 'Pemantauan harian (tiada penemuan)', short: 'Tiada penemuan', tone: 'green', icon: 'check' }
};
window.REPORT_ORDER = ['kosong', 'premis', 'kenderaan', 'permit', 'aduan', 'susulan', 'ppw', 'mesyuarat', 'bersepadu', 'sitaan'];

/* Jenis tindakan */
window.TINDAKAN = {
  amaran:   { label: 'Notis amaran', word: 'NOTIS AMARAN', fields: ['pemulihan', 'tempoh'] },
  tegas:    { label: 'Notis amaran tegas', word: 'NOTIS AMARAN TEGAS', fields: ['pemulihan', 'tempoh'] },
  kompaun:  { label: 'Kompaun', word: 'KOMPAUN', fields: ['tarikhBayar'] },
  sitaan:   { label: 'Sitaan', word: 'SITAAN', fields: ['barang'] },
  larangan: { label: 'Notis larangan', word: 'NOTIS LARANGAN', fields: ['tempoh'] },
  nasihat:  { label: 'Nasihat', word: 'NASIHAT', fields: [] }
};

/* Teks tetap */
window.TEMPLATES = {
  kosongHasil: 'Semasa pemantauan harian dijalankan di lokasi tersebut, tiada sebarang penemuan atau kesalahan dikesan. Tiada tindakan penguatkuasa diambil.',
  ppwKeterangan: 'Anggota-anggota penguatkuasa telah melakukan pemantauan harian di lokasi seperti di atas dengan tujuan untuk memantau dan memeriksa poster iklan pinjaman wang tanpa lesen yang biasa ditampal dan dipasang pada papan tanda di tepi jalan. Tindakan menampal dan memasang iklan pinjaman wang tanpa lesen ini bukan sahaja mencacatkan pemandangan malahan juga menimbulkan rasa kurang senang dan selesa dalam kalangan orang awam, penduduk sekitar taman perumahan serta menghalang penglihatan pengguna jalan raya terutama ketika keluar dan masuk simpang jalan.',
  ppwPuncaKuasa: [
    'Anggota-anggota penguatkuasa telah menggunakan peruntukan undang-undang berikut semasa mengambil tindakan menyita, menurunkan dan menanggalkan poster iklan pinjaman wang tanpa lesen seperti berikut:',
    '3.1 Seksyen 5(1), Akta Pemberi Pinjam Wang, 1951 dan Peraturan-Peraturan Pemberi Pinjam Wang (Kawalan dan Perlesenan) 2003.',
    'Seksyen 5(1): "No person shall carry on or advertise or announce himself or hold himself out in any way as carrying on the business of moneylending unless he is licensed under this Act."',
    'Peraturan 6(1): "Tiada iklan boleh dibuat oleh mana-mana pemberi pinjam wang kecuali dengan kelulusan Pendaftar."',
    'Oleh itu, pada menjalankan kuasa yang diperuntukkan oleh Menteri Perumahan dan Kerajaan Tempatan Malaysia menerusi kad kuasa yang dikeluarkan kepada anggota-anggota penguatkuasa yang dilantik sebagai Inspektor Pemberi Pinjam Wang di bawah Seksyen 4(1), Akta Pemberi Pinjam Wang, 1951, maka anggota-anggota penguatkuasa mempunyai kuasa untuk menurunkan dan menanggalkan poster iklan pinjaman wang tanpa lesen tersebut kerana tertakluk kepada Seksyen 5(1) dan Peraturan 6(1) di atas.',
    '3.2 Selain itu, anggota-anggota penguatkuasa juga telah mengenakan peruntukan Bylaw 4, The Local Authorities (Advertisements) By-Laws, 2012: "No person shall erect or exhibit or cause to be erected or exhibited within the areas under the jurisdiction of any local authority any advertisement, other than those exempted under by-law 26, without a licence issued by the local authority under by-law 7."'
  ],
  sitaanPuncaKuasa: [
    'Section 161, Local Authorities Ordinance, 1996 - Power to Entry and Investigation',
    'Section 161A, Local Authorities Ordinance, 1996 - Power to Seizure'
  ],
  sitaanSK: ['Pegawai Khidmat Pelanggan, Majlis Daerah Serian', 'Fail Sitaan', 'Fail Aduan Awam', 'Laporan Pemantauan Harian Penguatkuasa']
};

/* Contoh gaya penulisan untuk AI, dipetik daripada laporan sebenar */
window.STYLE_EXAMPLES = [
  'Anggota Penguatkuasa telah melakukan pemantauan harian di sekitar Bandar Serian bagi melakukan rondaan harian dan memeriksa kepatuhan permit sementara petak letak kereta. Pemeriksaan dilakukan adalah bertujuan untuk memastikan pemilik permit patuh terhadap syarat-syarat permit yang telah ditetapkan oleh pihak Majlis.',
  'Selain itu, semasa rondaan dilakukan, anggota penguatkuasa di lapangan telah mengenal pasti sebuah premis iaitu Super Save Trading yang telah melakukan kesalahan dengan meletakkan barangan seperti batu-bata dan tong sampah di kawasan awam (lot petak letak kereta) bagi tujuan "cop parkir". Tindakan ini adalah salah di bawah undang-undang kecil pihak berkuasa tempatan dan tindakan mengeluarkan notis Amaran Tegas telah dikeluarkan.',
  'Anggota Penguatkuasa telah melakukan tindakan melekatkan Notis Larangan Meletakkan Kenderaan Terbiar terhadap 2 buah kenderaan di Pekan Baki Baru. Tindakan berkenaan dilakukan kerana berdasarkan pemantauan harian ke sekitar pekan tersebut mendapati dua (2) buah kenderaan terbiar telah dikenal pasti dan dipantau sepanjang bulan.'
];
