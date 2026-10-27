/* Ciri AI menggunakan Google Gemini (kunci API disimpan dalam telefon sahaja) */
(function () {
  'use strict';
  const BASE = 'https://generativelanguage.googleapis.com/v1beta';
  const DEFAULT_MODEL = 'gemini-flash-latest';

  async function settings() { return (await DB.kv('settings', {})) || {}; }

  async function pickModel(key) {
    const res = await fetch(`${BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': key } });
    if (!res.ok) throw await apiError(res);
    const data = await res.json();
    const ok = (data.models || []).filter(m => (m.supportedGenerationMethods || []).includes('generateContent'));
    const names = ok.map(m => m.name.replace(/^models\//, ''));
    const prefer = [
      n => n === 'gemini-flash-latest',
      n => /^gemini-[\d.]+-flash$/.test(n),
      n => /flash/.test(n) && !/lite|image|tts|live|audio|thinking|exp/.test(n),
      n => /flash-lite/.test(n)
    ];
    for (const p of prefer) {
      const hits = names.filter(p).sort().reverse();
      if (hits.length) return hits[0];
    }
    if (names.length) return names[0];
    throw new Error('Tiada model Gemini yang boleh digunakan untuk kunci ini.');
  }

  async function apiError(res) {
    let msg = `Ralat ${res.status}`;
    try { const j = await res.json(); if (j.error && j.error.message) msg = j.error.message; } catch (e) { /* abaikan */ }
    const e = new Error(msg);
    e.status = res.status;
    if (res.status === 429) e.friendly = 'Had penggunaan AI percuma untuk hari ini sudah dicapai, atau terlalu banyak permintaan. Cuba sebentar lagi.';
    else if (res.status === 400 && /API key/i.test(msg)) e.friendly = 'Kunci Gemini tidak sah. Semak semula dalam Tetapan.';
    else if (res.status === 403) e.friendly = 'Kunci Gemini tidak dibenarkan. Semak semula dalam Tetapan.';
    return e;
  }

  async function call(parts, { json = true, temperature = 0.3 } = {}) {
    const st = await settings();
    if (!st.apiKey) { const e = new Error('no-key'); e.friendly = 'Kunci Gemini belum dimasukkan. Buka Tetapan untuk memasukkannya.'; throw e; }
    if (!navigator.onLine) { const e = new Error('offline'); e.friendly = 'Tiada sambungan internet. AI memerlukan internet.'; throw e; }
    let model = st.model || DEFAULT_MODEL;
    const body = { contents: [{ role: 'user', parts }], generationConfig: { temperature } };
    if (json) body.generationConfig.responseMimeType = 'application/json';
    const send = m => fetch(`${BASE}/models/${encodeURIComponent(m)}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': st.apiKey }, body: JSON.stringify(body)
    });
    let res = await send(model);
    if (res.status === 404) {
      model = await pickModel(st.apiKey);
      await DB.setKv('settings', { ...st, model });
      res = await send(model);
    }
    if (!res.ok) throw await apiError(res);
    const data = await res.json();
    const text = (((data.candidates || [])[0] || {}).content || {}).parts?.map(p => p.text || '').join('') || '';
    if (!text) { const e = new Error('empty'); e.friendly = 'AI tidak memberi jawapan. Cuba sekali lagi.'; throw e; }
    if (!json) return text;
    try { return JSON.parse(text.replace(/^```json\s*|```\s*$/g, '')); }
    catch (e) { const er = new Error('json'); er.friendly = 'Jawapan AI tidak dapat dibaca. Cuba sekali lagi.'; throw er; }
  }

  async function testKey(key) {
    const model = await pickModel(key);
    return model;
  }

  function blobToBase64(blob) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result).split(',')[1]);
      r.onerror = () => rej(r.error);
      r.readAsDataURL(blob);
    });
  }

  /* Ringkaskan laporan menjadi data untuk AI (tanpa gambar) */
  function factsOf(report, staff) {
    const byId = Object.fromEntries(staff.map(s => [s.id, s]));
    const W = window.WordGen;
    return {
      tarikh: W.fmtDate(report.tarikh) + ' (' + W.dayName(report.tarikh) + ')',
      masa: `${W.fmtTime(report.masaMula)} hingga ${W.fmtTime(report.masaTamat)} (${W.sesi(report.masaMula)})`,
      tempat: report.tempat,
      bilanganAnggota: (report.anggota || []).length,
      anggota: (report.anggota || []).map(id => byId[id]).filter(Boolean).map(a => `${a.nama} (${a.jawatan})`),
      bahagian: report.sections.map(s => ({
        id: s.id,
        jenis: window.REPORT_TYPES[s.type].label,
        butiran: s.fields,
        kesalahan: (s.kesalahan || []).map(k => ({
          premis: k.premis, butiran: k.butiran, peruntukan: W.citeList(k),
          tindakan: k.tindakan && window.TINDAKAN[k.tindakan.jenis] ? {
            jenis: window.TINDAKAN[k.tindakan.jenis].label,
            tindakanPemulihan: k.tindakan.pemulihan || undefined,
            tempohHari: k.tindakan.tempohHari === '' ? undefined : k.tindakan.tempohHari,
            tarikhAkhir: k.tindakan.tarikhAkhir ? W.fmtDate(k.tindakan.tarikhAkhir) : undefined,
            tarikhAkhirBayaran: k.tindakan.tarikhBayar ? W.fmtDate(k.tindakan.tarikhBayar) : undefined,
            barangDisita: k.tindakan.barang || undefined
          } : 'tiada'
        })),
        kenderaan: s.kenderaan,
        tindakanKenderaan: s.type === 'kenderaan' && s.tindakan && s.tindakan.jenis ? {
          jenis: window.TINDAKAN[s.tindakan.jenis].label, tarikhAkhir: s.tindakan.tarikhAkhir ? W.fmtDate(s.tindakan.tarikhAkhir) : undefined,
          peruntukan: W.cite('K', '27(1)')
        } : undefined,
        agensi: s.agensi, lokasiOperasi: s.lokasiOps,
        bilanganGambar: (s.photos || []).length,
        nota: s.fields && s.fields.nota
      }))
    };
  }

  const KEYS = {
    kosong: {},
    premis: { hasil: 'Hasil pemeriksaan: apa yang dilakukan, apa yang ditemui di setiap premis, kesalahan dan tindakan yang diambil (termasuk tempoh pemulihan / tarikh akhir).' },
    permit: { hasil: 'Hasil pemeriksaan permit: tujuan pemeriksaan, status pematuhan dan arahan yang diberi.' },
    kenderaan: { hasil: 'Hasil pemantauan kenderaan terbiar: bilangan kenderaan (tulis nombor dalam perkataan dan angka, cth. dua (2)), lokasi, tindakan dan peruntukan undang-undang. Jangan senaraikan semula setiap nombor plat kerana jadual disediakan.' },
    mesyuarat: { hasil: 'Catatan mesyuarat / taklimat / kerja ukur: tujuan dan hasil.' },
    aduan: { hasil: 'Hasil pemeriksaan aduan: bila dan di mana pemeriksaan dibuat, apa yang ditemui.', kesimpulan: 'Kesimpulan: sama ada aduan sah atau tidak sah (ikut butiran.kesimpulan) dan nasihat / tindakan seterusnya.' },
    susulan: { hasil: 'Hasil pemeriksaan susulan: apa yang diperiksa berbanding arahan asal dan keadaan semasa.', kesimpulan: 'Kesimpulan: patuh atau tidak patuh (ikut butiran.status) dan tindakan seterusnya.' },
    ppw: { hasil: 'Hasil pemantauan PPW: lokasi poster ditemui, bilangan poster yang disita / diturunkan (ikut butiran.bilangan), dan pengesahan kawasan sudah bersih.' },
    bersepadu: { keterangan: 'Keterangan operasi: latar belakang, objektif, agensi yang terlibat dan rujukan surat jemputan.', rumusan: 'Rumusan operasi secara keseluruhan dan tindakan susulan.' },
    sitaan: { latarBelakang: 'Latar belakang operasi sitaan: aduan, pemeriksaan dan notis terdahulu, dan sebab sitaan dibuat.', kronologi: 'Kronologi tindakan sitaan mengikut masa: taklimat, tiba di lokasi, sitaan, tamat, barang dibawa ke stor, repot polis.' }
  };

  const RULES = [
    'Anda menulis laporan rasmi Bahagian Penguatkuasa, Majlis Daerah Serian, Sarawak, dalam Bahasa Melayu baku yang formal.',
    'Gunakan HANYA fakta dalam DATA. Jangan reka nama, nombor, masa, tarikh, bilangan, nombor plat, nombor repot atau peruntukan undang-undang yang tiada dalam DATA.',
    'Jika sesuatu fakta tiada, jangan sebut langsung. Jangan tulis tempat kosong seperti [NAMA].',
    'Tulis masa dalam format 0930hrs dan tarikh dalam format 26.10.2026.',
    'Gunakan istilah "anggota penguatkuasa", "premis", "notis amaran tegas" dan sebagainya seperti contoh.',
    'Setiap bahagian ditulis dalam perenggan pendek (2 hingga 4 ayat setiap perenggan). Pisahkan perenggan dengan baris kosong. Jangan letak nombor perenggan, tajuk atau tanda bullet.'
  ];

  async function writeDescriptions(report, staff, onlySectionId) {
    const facts = factsOf(report, staff);
    const want = report.sections.filter(s => (!onlySectionId || s.id === onlySectionId) && Object.keys(KEYS[s.type] || {}).length).map(s => ({ id: s.id, jenis: s.type, tulis: KEYS[s.type] }));
    if (!want.length) return {}; // Tiada bahagian yang perlu teks AI (cth. tiada penemuan): tidak panggil API
    const prompt = [
      ...RULES,
      '',
      'CONTOH GAYA PENULISAN (daripada laporan sebenar, ikut gayanya sahaja, bukan faktanya):',
      ...window.STYLE_EXAMPLES.map((e, i) => `${i + 1}. ${e}`),
      '',
      'DATA LAPORAN (JSON):',
      JSON.stringify(facts),
      '',
      'TUGASAN: Untuk setiap bahagian di bawah, tulis teks bagi setiap kunci yang diminta.',
      JSON.stringify(want),
      '',
      'Jawab dalam JSON sahaja dengan bentuk: {"bahagian":[{"id":"<id bahagian>", "<kunci>":"<teks>", ...}]}'
    ].join('\n');
    const out = await call([{ text: prompt }], { temperature: 0.35 });
    const list = Array.isArray(out) ? out : (out.bahagian || out.sections || []);
    const map = {};
    list.forEach(b => { if (b && b.id) map[b.id] = b; });
    return map;
  }

  async function checkReport(report, staff) {
    const facts = factsOf(report, staff);
    const texts = report.sections.map(s => ({ id: s.id, jenis: window.REPORT_TYPES[s.type].label, teks: s.ai }));
    const prompt = [
      'Anda pemeriksa laporan penguatkuasa. Bandingkan TEKS PENERANGAN dengan DATA.',
      'Senaraikan HANYA percanggahan atau maklumat penting yang tertinggal, contohnya: masa, tarikh, bilangan, nama premis, nombor plat, jenis tindakan, tempoh atau peruntukan undang-undang dalam teks tidak sama dengan DATA; fakta dalam teks yang tiada dalam DATA; kenderaan atau kesalahan dalam DATA yang tidak disebut langsung dalam teks.',
      'Jangan komen tentang gaya bahasa. Jika tiada masalah, pulangkan senarai kosong.',
      'Setiap mesej ringkas (bawah 20 patah perkataan) dalam Bahasa Melayu.',
      '',
      'DATA:', JSON.stringify(facts), '',
      'TEKS PENERANGAN:', JSON.stringify(texts), '',
      'Jawab JSON sahaja: {"isu":[{"id":"<id bahagian>","mesej":"..."}]}'
    ].join('\n');
    const out = await call([{ text: prompt }], { temperature: 0.1 });
    return (out.isu || out.issues || []).filter(x => x && x.mesej);
  }

  async function scanPlate(blob) {
    const data = await blobToBase64(blob);
    const prompt = 'Gambar ini ialah kenderaan (kemungkinan kenderaan terbiar) di Malaysia. Kenal pasti nombor pendaftaran pada plat, jenama dan model kenderaan, serta warna utama. Jika tidak pasti, biarkan kosong. Jangan meneka nombor plat yang tidak jelas. Jawab JSON sahaja: {"noPlat":"", "jenis":"<jenama dan model>", "warna":"", "yakin": true|false}';
    return call([{ text: prompt }, { inlineData: { mimeType: blob.type || 'image/jpeg', data } }], { temperature: 0 });
  }

  window.AI = { call, testKey, writeDescriptions, checkReport, scanPlate, KEYS, DEFAULT_MODEL };
})();
