/* Laporan Rondaan — aplikasi utama */
(function () {
  'use strict';

  /* ---------- Utiliti ---------- */
  const app = document.getElementById('app');
  const W = window.WordGen;
  const IC = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
    spark: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    home: '<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    store: '<path d="M4 10v10h16V10"/><path d="M3 10l2-6h14l2 6z"/><path d="M10 20v-5h4v5"/>',
    car: '<path d="M5 15l1.5-5h11l1.5 5"/><path d="M3 15h18v3H3z"/><circle cx="7.5" cy="18.5" r="1.5"/><circle cx="16.5" cy="18.5" r="1.5"/>',
    message: '<path d="M4 5h16v11H8l-4 4z"/>',
    repeat: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v5h-5"/>',
    poster: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21 20c0-2.6-1.7-4.9-4-5.7"/>',
    shield: '<path d="M12 3l8 3v6c0 4.6-3.4 8.4-8 9-4.6-.6-8-4.4-8-9V6z"/>',
    box: '<path d="M3 7l9-4 9 4-9 4z"/><path d="M3 7v10l9 4 9-4V7M12 11v10"/>',
    badge: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 10h6M7 14h10"/>',
    edit: '<path d="M4 20h4l11-11-4-4L4 16z"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M17 6l3 3M15 8l2 2"/>',
    list: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>'
  };
  const icon = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ''}</svg>`;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = (p = 'x') => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const pad = n => String(n).padStart(2, '0');
  const isoDate = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = () => isoDate(new Date());
  const BULAN = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
  const BLN = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'];
  const shortDate = iso => { if (!iso) return ''; const [, m, d] = iso.split('-'); return `${Number(d)} ${BLN[Number(m) - 1]}`; };
  const initials = n => String(n || '').replace(/\b(anak|bin|binti|a\/l|a\/p)\b/gi, '').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  const firstName = n => String(n || '').split(/\s+/)[0] || '';

  function getPath(o, path) { return path.split('.').reduce((a, k) => (a == null ? a : a[k]), o); }
  function setPath(o, path, v) {
    const ks = path.split('.');
    let a = o;
    for (let i = 0; i < ks.length - 1; i++) { if (a[ks[i]] == null) a[ks[i]] = /^\d+$/.test(ks[i + 1]) ? [] : {}; a = a[ks[i]]; }
    a[ks[ks.length - 1]] = v;
  }

  /* ---------- Keadaan ---------- */
  const S = { staff: [], settings: {}, usage: {}, done: [], report: null, urls: {}, installEvt: null };
  let saveTimer = null;

  function toast(msg, ms = 2800) {
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'status');
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveNow, 400);
  }
  async function saveNow() {
    clearTimeout(saveTimer);
    if (!S.report) return;
    normalize(S.report);
    S.report.updatedAt = Date.now();
    await DB.put('reports', S.report);
  }

  /* Kira semula tarikh akhir dsb. */
  function normalize(r) {
    (r.sections || []).forEach(s => {
      (s.kesalahan || []).forEach(k => fixTindakan(k.tindakan, r.tarikh));
      if (s.tindakan) fixTindakan(s.tindakan, r.tarikh);
    });
  }
  function fixTindakan(t, tarikh) {
    if (!t || !t.jenis) return;
    const T = window.TINDAKAN[t.jenis];
    if (T && T.fields.includes('tempoh') && t.tempohHari !== '' && t.tempohHari != null && tarikh) t.tarikhAkhir = W.addDays(tarikh, Number(t.tempohHari));
    else if (T && !T.fields.includes('tempoh')) delete t.tarikhAkhir;
  }

  /* ---------- Gambar ---------- */
  function pickFiles({ camera = false, multiple = false } = {}) {
    return new Promise(resolve => {
      const inp = document.createElement('input');
      inp.type = 'file';
      inp.accept = 'image/*';
      if (camera) inp.setAttribute('capture', 'environment');
      if (multiple) inp.multiple = true;
      inp.style.display = 'none';
      inp.onchange = () => { resolve([...(inp.files || [])]); inp.remove(); };
      document.body.appendChild(inp);
      inp.click();
    });
  }
  async function processImage(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
      const max = 1600;
      const scale = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * scale), h = Math.round(img.naturalHeight * scale);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      c.getContext('2d').drawImage(img, 0, 0, w, h);
      const blob = await new Promise(res => c.toBlob(res, 'image/jpeg', 0.82));
      return { blob, w, h, mime: 'image/jpeg' };
    } finally { URL.revokeObjectURL(url); }
  }
  async function addPhotos(files) {
    const ids = [];
    for (const f of files) {
      try {
        const p = await processImage(f);
        const id = uid('p');
        await DB.put('photos', { id, ...p });
        S.urls[id] = URL.createObjectURL(p.blob);
        ids.push({ id, blob: p.blob });
      } catch (e) { toast('Satu gambar tidak dapat dibaca.'); }
    }
    return ids;
  }
  async function loadUrls(r) {
    for (const s of r.sections || []) for (const p of s.photos || []) {
      if (!S.urls[p.id]) { const rec = await DB.get('photos', p.id); if (rec) S.urls[p.id] = URL.createObjectURL(rec.blob); }
    }
  }

  /* ---------- Peringatan susulan ---------- */
  function reminderItems(reports) {
    const items = [];
    reports.filter(r => r.status === 'siap').forEach(r => r.sections.forEach(s => {
      (s.kesalahan || []).forEach(k => {
        const t = k.tindakan || {};
        let due = null;
        if (['amaran', 'tegas', 'larangan'].includes(t.jenis) && t.tarikhAkhir && Number(t.tempohHari) > 0) due = t.tarikhAkhir;
        if (t.jenis === 'kompaun' && t.tarikhBayar) due = t.tarikhBayar;
        if (due) items.push({ key: `${r.id}:${s.id}:${k.id}`, due, premis: k.premis || firstLine(s.fields.lokasi) || r.tempat, label: window.TINDAKAN[t.jenis].label, kind: t.jenis === 'kompaun' ? 'Semak bayaran kompaun' : 'Susulan perlu dibuat', r, s, k });
      });
      if (s.type === 'kenderaan' && s.tindakan && s.tindakan.tarikhAkhir && Number(s.tindakan.tempohHari) > 0) {
        items.push({ key: `${r.id}:${s.id}:veh`, due: s.tindakan.tarikhAkhir, premis: s.fields.lokasi || r.tempat, label: 'Notis larangan kenderaan terbiar', kind: 'Susulan kenderaan terbiar', r, s, k: null });
      }
    }));
    return items.filter(i => !S.done.includes(i.key)).sort((a, b) => a.due.localeCompare(b.due));
  }
  const firstLine = t => String(t || '').split('\n')[0].trim();

  /* ---------- Laporan baharu ---------- */
  function nowTimes() {
    const d = new Date();
    let m = Math.floor(d.getMinutes() / 5) * 5;
    const start = `${pad(d.getHours())}:${pad(m)}`;
    const e = new Date(d.getTime() + 90 * 60000);
    let end = `${pad(e.getHours())}:${pad(Math.floor(e.getMinutes() / 5) * 5)}`;
    if (end < start) end = '23:55';
    return [start, end];
  }
  function newReport() {
    const [a, b] = nowTimes();
    const peny = S.settings.penyedia || window.DEFAULT_PENYEDIA;
    return { id: uid('r'), createdAt: Date.now(), updatedAt: Date.now(), status: 'draf', tarikh: today(), masaMula: a, masaTamat: b, tempat: '', anggota: S.staff.some(s => s.id === peny) ? [peny] : [], penyedia: peny, sections: [] };
  }
  function newSection(type) {
    const s = { id: uid('s'), type, fields: {}, photos: [], ai: {} };
    if (['premis', 'permit', 'aduan', 'susulan', 'sitaan'].includes(type)) s.kesalahan = [];
    if (type === 'kenderaan') { s.kenderaan = []; s.tindakan = { jenis: 'larangan', tempohHari: 7 }; }
    if (type === 'bersepadu') { s.agensi = [{ id: uid('g'), nama: '', anggota: '' }]; s.lokasiOps = [{ id: uid('l'), nama: '', naratif: '', tindakan: '' }]; }
    if (type === 'mesyuarat') s.fields.jenis = 'Taklimat';
    if (type === 'aduan') s.fields.kesimpulan = '';
    if (type === 'ppw') s.fields.bilangan = '';
    return s;
  }
  function summaryOf(r) {
    const types = [...new Set(r.sections.map(s => window.REPORT_TYPES[s.type].label))];
    return types.join(', ') || 'Belum ada bahagian';
  }
  function placeOf(r) {
    for (const s of r.sections) { const v = firstLine(s.fields.lokasi || s.fields.tajuk || s.fields.lokasiAduan); if (v) return v; }
    return r.tempat || '';
  }
  function fileName(r, all) {
    const base = `Laporan_${W.fmtDate(r.tarikh)}_${W.sesi(r.masaMula)}`;
    const same = all.filter(x => x.id !== r.id && x.fileName && x.fileName.startsWith(base));
    return same.length ? `${base}_${same.length + 1}.docx` : `${base}.docx`;
  }

  /* ---------- Lembaran bawah ---------- */
  function openSheet(title, bodyHtml, onClick, onInput) {
    closeSheet();
    const bg = document.createElement('div');
    bg.className = 'sheet-bg';
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="grab"></div><div class="sheet-h"><h2>${esc(title)}</h2><button class="x-btn" data-close aria-label="Tutup">${icon('x', 'ic-sm')}</button></div><div class="sheet-body">${bodyHtml}</div></div>`;
    bg.addEventListener('click', e => {
      if (e.target === bg || e.target.closest('[data-close]')) { closeSheet(); return; }
      if (onClick) onClick(e, bg);
    });
    if (onInput) bg.addEventListener('input', e => onInput(e, bg));
    document.body.appendChild(bg);
    document.body.style.overflow = 'hidden';
    return bg;
  }
  function closeSheet() {
    document.querySelectorAll('.sheet-bg').forEach(x => x.remove());
    document.body.style.overflow = '';
  }
  function confirmSheet(title, msg, okLabel, danger) {
    return new Promise(resolve => {
      openSheet(title, `<p style="margin:0;font-size:15px">${esc(msg)}</p><div class="row2"><button class="btn" data-no>Batal</button><button class="btn ${danger ? 'danger' : 'green'}" data-yes>${esc(okLabel)}</button></div>`, e => {
        if (e.target.closest('[data-yes]')) { closeSheet(); resolve(true); }
        if (e.target.closest('[data-no]')) { closeSheet(); resolve(false); }
      });
    });
  }

  function timeSheet(path) {
    let [h, m] = String(getPath(S.report, path) || '09:00').split(':');
    const body = () => `<div class="time-display" id="td">${h}:${m}</div>
      <div class="label">Jam</div><div class="grid6">${Array.from({ length: 24 }, (_, i) => pad(i)).map(x => `<button data-h="${x}" class="${x === h ? 'on' : ''}">${x}</button>`).join('')}</div>
      <div class="label">Minit</div><div class="grid6">${Array.from({ length: 12 }, (_, i) => pad(i * 5)).map(x => `<button data-m="${x}" class="${x === m ? 'on' : ''}">${x}</button>`).join('')}</div>
      <button class="big-btn" data-ok style="flex:none">Selesai</button>`;
    const bg = openSheet(path === 'masaMula' ? 'Masa mula' : 'Masa tamat', body(), e => {
      const b = e.target.closest('button');
      if (!b) return;
      if (b.dataset.h) h = b.dataset.h;
      if (b.dataset.m) m = b.dataset.m;
      if (b.dataset.ok != null) {
        setPath(S.report, path, `${h}:${m}`);
        closeSheet(); scheduleSave(); render();
        return;
      }
      bg.querySelector('.sheet-body').innerHTML = body();
    });
  }

  function bylawSheet(sectionIdx) {
    let q = '';
    let showAll = false;
    const shortSorted = () => [...window.SHORTLIST].sort((a, b) => (S.usage[b.id] || 0) - (S.usage[a.id] || 0));
    const match = (txt) => txt.toLowerCase().includes(q.toLowerCase());
    const list = () => {
      const sl = shortSorted().filter(x => !q || match(x.label + ' ' + x.butiran + ' ' + x.cites.map(c => c[1]).join(' ')));
      let html = `<div class="law-group">KERAP DIGUNAKAN</div>` + (sl.length ? sl.map(x => `<button class="law-item" data-short="${x.id}"><b>${esc(x.label)}</b><span>${esc(x.cites.map(c => `${window.LAWS[c[0]].prefix} ${c[1]}, ${window.LAWS[c[0]].short}`).join(' + '))}</span></button>`).join('') : '<div class="hint">Tiada padanan.</div>');
      if (q || showAll) {
        const all = window.BYLAWS.filter(b => !q || match(`${b.bm} ${b.en} ${b.ref} ${window.LAWS[b.law].short}`));
        let last = '';
        html += all.length ? '' : '<div class="hint mt">Tiada padanan dalam semua undang-undang.</div>';
        all.forEach(b => {
          if (b.law !== last) { html += `<div class="law-group">${esc(window.LAWS[b.law].bm.toUpperCase())}</div>`; last = b.law; }
          html += `<button class="law-item" data-law="${esc(b.id)}"><b>${esc(b.bm)}</b><span>${esc(`${window.LAWS[b.law].prefix} ${b.ref}`.trim())}</span></button>`;
        });
      } else {
        html += `<button class="btn dashed block" data-showall>${icon('search', 'ic-sm')} Lihat semua 131 undang-undang</button>`;
      }
      html += `<button class="btn block" data-custom>${icon('edit', 'ic-sm')} Lain-lain (taip sendiri)</button>`;
      return html;
    };
    const bg = openSheet('Pilih kesalahan', `<div class="with-icon search">${icon('search')}<input class="input" id="lawq" type="search" placeholder="Cari: poster, kenderaan, 27(1)" aria-label="Cari kesalahan"></div><div id="lawlist" style="display:flex;flex-direction:column;gap:8px">${list()}</div>`, e => {
      const s = S.report.sections[sectionIdx];
      const sec = e.target.closest('button');
      if (!sec) return;
      if (sec.dataset.showall != null) { showAll = true; bg.querySelector('#lawlist').innerHTML = list(); return; }
      let k = null;
      const defPremis = s.type === 'susulan' ? (s.fields.tajuk || '') : firstLine(s.fields.lokasi || s.fields.lokasiAduan || s.fields.tajuk);
      if (sec.dataset.short) {
        const x = window.SHORTLIST.find(y => y.id === sec.dataset.short);
        k = { id: uid('k'), premis: defPremis, butiran: x.butiran, cites: x.cites.map(c => [...c]), src: x.id, label: x.label, tindakan: { jenis: x.tindakan || (s.type === 'sitaan' ? 'sitaan' : 'tegas'), tempohHari: x.tindakan === 'larangan' ? 7 : 5, pemulihan: '' } };
        S.usage[x.id] = (S.usage[x.id] || 0) + 1;
        DB.setKv('usage', S.usage);
      } else if (sec.dataset.law) {
        const b = window.BYLAWS.find(y => y.id === sec.dataset.law);
        k = { id: uid('k'), premis: defPremis, butiran: b.bm, cites: [[b.law, b.ref]], src: b.id, label: b.bm, tindakan: { jenis: s.type === 'sitaan' ? 'sitaan' : 'tegas', tempohHari: 5, pemulihan: '' } };
      } else if (sec.dataset.custom != null) {
        k = { id: uid('k'), premis: defPremis, butiran: '', cites: [], customCite: '', custom: true, label: 'Kesalahan lain', tindakan: { jenis: 'tegas', tempohHari: 5, pemulihan: '' } };
      }
      if (k) { s.kesalahan.push(k); closeSheet(); scheduleSave(); render(); }
    }, e => {
      if (e.target.id === 'lawq') { q = e.target.value.trim(); bg.querySelector('#lawlist').innerHTML = list(); }
    });
    setTimeout(() => { const i = bg.querySelector('#lawq'); if (i) i.focus(); }, 50);
  }

  async function refSheet(sectionIdx) {
    const reports = await DB.all('reports');
    const items = reminderItems(reports);
    const extra = [];
    reports.filter(r => r.status === 'siap' && r.id !== S.report.id).sort((a, b) => (b.tarikh || '').localeCompare(a.tarikh || '')).slice(0, 30).forEach(r => r.sections.forEach(s => {
      (s.kesalahan || []).forEach(k => { const key = `${r.id}:${s.id}:${k.id}`; if (!items.some(i => i.key === key)) extra.push({ key, due: (k.tindakan || {}).tarikhAkhir || '', premis: k.premis || firstLine(s.fields.lokasi) || r.tempat, label: window.TINDAKAN[(k.tindakan || {}).jenis]?.label || 'Kesalahan', r, s, k }); });
      if (s.type === 'aduan') { const key = `${r.id}:${s.id}:aduan`; extra.push({ key, due: '', premis: s.fields.tajuk || s.fields.lokasiAduan || r.tempat, label: 'Aduan awam', r, s, k: null }); }
    }));
    const all = [...items, ...extra];
    const row = (i, idx) => `<button class="item" data-i="${idx}"><div class="tile tone-amber">${icon('repeat')}</div><div class="tx"><span class="t1">${esc(i.premis || '-')}</span><span class="t2">${esc(i.label)} · ${W.fmtDate(i.r.tarikh)}${i.due ? ' · akhir ' + W.fmtDate(i.due) : ''}</span></div></button>`;
    openSheet('Pilih laporan asal', all.length ? all.map(row).join('') : '<div class="hint">Belum ada laporan siap untuk dirujuk.</div>', e => {
      const b = e.target.closest('[data-i]');
      if (!b) return;
      applyRef(S.report.sections[sectionIdx], all[Number(b.dataset.i)]);
      closeSheet(); scheduleSave(); loadUrls(S.report).then(render);
    });
  }
  function refSummary(i) {
    const r = i.r, s = i.s, k = i.k;
    if (k) {
      const t = k.tindakan || {};
      let txt = `Pada ${W.fmtDate(r.tarikh)}, anggota penguatkuasa telah mengenal pasti ${k.premis || 'premis berkenaan'} melakukan kesalahan ${String(k.butiran || '').replace(/\.$/, '').toLowerCase()} di bawah ${W.citeList(k)}.`;
      if (t.jenis) txt += ` Tindakan ${window.TINDAKAN[t.jenis].label.toLowerCase()} telah dikeluarkan`;
      if (t.pemulihan) txt += ` dengan arahan ${String(t.pemulihan).toLowerCase()}`;
      if (t.tarikhAkhir && Number(t.tempohHari) > 0) txt += ` dalam tempoh ${t.tempohHari} hari (sehingga ${W.fmtDate(t.tarikhAkhir)})`;
      if (t.jenis === 'kompaun' && t.tarikhBayar) txt += ` dengan tarikh akhir bayaran ${W.fmtDate(t.tarikhBayar)}`;
      return txt + '.';
    }
    if (s.type === 'kenderaan') {
      const v = (s.kenderaan || []).map(x => `${x.jenis || 'kenderaan'} (${x.noPlat || 'tiada nombor plat'})`).join(', ');
      return `Pada ${W.fmtDate(r.tarikh)}, notis larangan meletakkan kenderaan terbiar telah dilekatkan pada ${v} di ${s.fields.lokasi || r.tempat}${s.tindakan && s.tindakan.tarikhAkhir ? ' dengan tarikh akhir ' + W.fmtDate(s.tindakan.tarikhAkhir) : ''}.`;
    }
    if (s.type === 'aduan') return `Pemeriksaan pertama terhadap aduan "${s.fields.tajuk || ''}" telah dilakukan pada ${W.fmtDate(r.tarikh)} di ${s.fields.lokasiAduan || r.tempat}.${s.ai && s.ai.kesimpulan ? ' ' + s.ai.kesimpulan : ''}`;
    return '';
  }
  function applyRef(sec, i) {
    sec.ref = { key: i.key, reportId: i.r.id, tarikh: i.r.tarikh, label: i.label, premis: i.premis };
    sec.fields.tajuk = sec.fields.tajuk || i.premis;
    sec.fields.lokasi = sec.fields.lokasi || i.premis;
    sec.fields.asal = refSummary(i);
    sec.fields.tujuan = sec.fields.tujuan || `Memeriksa pematuhan terhadap ${i.label.toLowerCase()} yang dikeluarkan pada ${W.fmtDate(i.r.tarikh)}`;
    const have = new Set((sec.photos || []).map(p => p.id));
    (i.s.photos || []).forEach(p => { if (!have.has(p.id)) sec.photos.push({ id: p.id, caption: p.caption || '', label: 'Sebelum' }); });
  }

  /* ---------- Paparan: komponen borang ---------- */
  function fText(label, path, o = {}) {
    const v = getPath(S.report, path);
    const id = 'f' + path.replace(/\W/g, '_');
    const inp = `<input class="input" id="${id}" type="${o.type || 'text'}" ${o.type === 'number' ? 'inputmode="numeric" min="0"' : ''} data-bind="${path}" ${o.num ? 'data-num' : ''} value="${esc(v)}" placeholder="${esc(o.ph || '')}" ${o.rerender ? 'data-rerender' : ''}>`;
    return `<div class="field">${label ? `<label class="label" for="${id}">${esc(label)}</label>` : ''}${o.icon ? `<div class="with-icon">${icon(o.icon)}${inp}</div>` : inp}${o.hint ? `<span class="hint">${esc(o.hint)}</span>` : ''}</div>`;
  }
  function fArea(label, path, o = {}) {
    const v = getPath(S.report, path);
    const id = 'f' + path.replace(/\W/g, '_');
    return `<div class="field">${label ? `<label class="label" for="${id}">${esc(label)}</label>` : ''}<textarea class="textarea ${o.tall ? 'tall' : ''}" id="${id}" data-bind="${path}" placeholder="${esc(o.ph || '')}" rows="${o.rows || 3}">${esc(v)}</textarea>${o.hint ? `<span class="hint">${esc(o.hint)}</span>` : ''}</div>`;
  }
  function fSelect(label, path, options, o = {}) {
    const v = getPath(S.report, path) || '';
    const id = 'f' + path.replace(/\W/g, '_');
    return `<div class="field"><label class="label" for="${id}">${esc(label)}</label><select class="select" id="${id}" data-bind="${path}" ${o.rerender ? 'data-rerender' : ''}><option value="">${esc(o.ph || 'Pilih')}</option>${options.map(x => { const [val, lab] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(val)}" ${val === v ? 'selected' : ''}>${esc(lab)}</option>`; }).join('')}</select></div>`;
  }
  function fChips(path, options) {
    const v = getPath(S.report, path) || '';
    return `<div class="chips">${options.map(o => `<button type="button" class="chip small ${o === v ? 'on' : ''}" aria-pressed="${o === v}" data-act="setval" data-path="${path}" data-val="${esc(o)}">${o === v ? icon('check', 'ic-sm') : ''}${esc(o)}</button>`).join('')}</div>`;
  }

  function tindakanBox(path, allowed) {
    const t = getPath(S.report, path) || {};
    const T = window.TINDAKAN[t.jenis];
    let h = `<div class="tbox"><span class="label-sm">Tindakan</span><div class="chips">${allowed.map(j => `<button type="button" class="chip small white ${t.jenis === j ? 'on' : ''}" aria-pressed="${t.jenis === j}" data-act="tindakan" data-path="${path}" data-val="${j}">${t.jenis === j ? icon('check', 'ic-sm') : ''}${esc(window.TINDAKAN[j].label)}</button>`).join('')}</div>`;
    if (T) {
      if (T.fields.includes('pemulihan')) h += fText('Tindakan pemulihan', `${path}.pemulihan`, { ph: 'Contoh: Alihkan barangan berkenaan' });
      if (T.fields.includes('tempoh')) {
        const opts = [[0, 'Serta merta'], [3, '3 hari'], [5, '5 hari'], [7, '7 hari'], [14, '14 hari']];
        h += `<span class="label-sm">${t.jenis === 'larangan' ? 'Tempoh untuk alih' : 'Tempoh pemulihan'}</span><div class="chips">${opts.map(([d, l]) => `<button type="button" class="chip small white ${String(t.tempohHari) === String(d) ? 'on' : ''}" data-act="tempoh" data-path="${path}" data-val="${d}">${l}</button>`).join('')}</div>`;
        h += fText('', `${path}.tempohHari`, { type: 'number', num: true, ph: 'Atau taip bilangan hari', rerender: true });
        if (t.tarikhAkhir && Number(t.tempohHari) > 0) h += `<span class="due">${icon('bell', 'ic-sm')} Tarikh akhir ${W.fmtDate(t.tarikhAkhir)}, peringatan susulan akan muncul</span>`;
      }
      if (T.fields.includes('tarikhBayar')) {
        h += fText('Tarikh akhir bayaran', `${path}.tarikhBayar`, { type: 'date', rerender: true });
        if (t.tarikhBayar) h += `<span class="due">${icon('bell', 'ic-sm')} Peringatan semak bayaran pada ${W.fmtDate(t.tarikhBayar)}</span>`;
      }
      if (T.fields.includes('barang')) h += fText('Barang disita', `${path}.barang`, { ph: 'Contoh: Gerai jualan, kanvas, 2 bekas air' });
    }
    return h + '</div>';
  }

  function kesalahanEditor(si, s, defaultTindakan) {
    const allowed = s.type === 'sitaan' ? ['sitaan', 'kompaun', 'tegas'] : ['amaran', 'tegas', 'kompaun', 'sitaan', 'larangan', 'nasihat'];
    let h = `<div class="card-h"><span class="label">${s.type === 'susulan' ? 'Tindakan lanjut (jika tidak patuh)' : 'Kesalahan dan tindakan'}</span><span class="hint">${(s.kesalahan || []).length || 'Tiada'}</span></div>`;
    (s.kesalahan || []).forEach((k, ki) => {
      const p = `sections.${si}.kesalahan.${ki}`;
      h += `<div class="kes"><div class="kes-h"><div class="tx"><span class="t1">${esc(k.label || k.butiran || 'Kesalahan')}</span><span class="t2">${esc(W.citeList(k) || 'Rujukan belum diisi')}</span></div><button type="button" class="x-btn" data-act="rmkes" data-si="${si}" data-ki="${ki}" aria-label="Buang kesalahan">${icon('x', 'ic-sm')}</button></div>`;
      h += fText('Nama pelaku / premis', `${p}.premis`, { ph: 'Contoh: Super Save Trading' });
      h += fArea('Butiran kesalahan', `${p}.butiran`, { rows: 2 });
      if (k.custom) h += fText('Rujukan undang-undang', `${p}.customCite`, { ph: 'Contoh: Bylaw 5, Market By-Laws' });
      h += tindakanBox(`${p}.tindakan`, allowed);
      h += '</div>';
    });
    h += `<button type="button" class="btn dashed block" data-act="addkes" data-si="${si}">${icon('plus', 'ic-sm')} Tambah kesalahan</button>`;
    return h;
  }

  function photosBlock(si, s) {
    const labelled = ['susulan', 'sitaan'].includes(s.type);
    let h = `<div class="card-h"><span class="label">Gambar</span><span class="hint">${(s.photos || []).length} gambar</span></div>`;
    if ((s.photos || []).length) {
      h += '<div class="ph-meta">';
      s.photos.forEach((p, pi) => {
        h += `<div class="ph-row"><div class="ph" style="width:64px;height:64px">${S.urls[p.id] ? `<img src="${S.urls[p.id]}" alt="Gambar ${pi + 1}">` : ''}${p.label ? `<span class="lbl" style="font-size:9px;padding:2px 5px">${esc(p.label)}</span>` : ''}</div><div style="display:flex;flex-direction:column;gap:6px;min-width:0">`;
        if (labelled) h += `<div class="chips">${['Sebelum', 'Selepas'].map(l => `<button type="button" class="chip small ${p.label === l ? 'on' : ''}" data-act="phlabel" data-si="${si}" data-pi="${pi}" data-val="${l}">${l}</button>`).join('')}<button type="button" class="x-btn" data-act="rmph" data-si="${si}" data-pi="${pi}" aria-label="Buang gambar">${icon('trash', 'ic-sm')}</button></div>`;
        h += `<div style="display:flex;gap:6px;align-items:center"><input class="input" style="padding:9px 12px;font-size:13px" data-bind="sections.${si}.photos.${pi}.caption" value="${esc(p.caption)}" placeholder="Keterangan gambar (pilihan)" aria-label="Keterangan gambar ${pi + 1}">${labelled ? '' : `<button type="button" class="x-btn" data-act="rmph" data-si="${si}" data-pi="${pi}" aria-label="Buang gambar">${icon('trash', 'ic-sm')}</button>`}</div></div></div>`;
      });
      h += '</div>';
    }
    h += `<div class="row2"><button type="button" class="btn" data-act="cam" data-si="${si}">${icon('camera', 'ic-sm')} Kamera</button><button type="button" class="btn" data-act="gal" data-si="${si}">${icon('image', 'ic-sm')} Galeri</button></div>`;
    return h;
  }

  function sectionCard(s, si) {
    const T = window.REPORT_TYPES[s.type];
    const p = `sections.${si}.fields`;
    let h = `<section class="card section-card" id="sec-${s.id}"><div class="sec-title"><div class="tile tone-${T.tone}">${icon(T.icon)}</div><b>${esc(T.label)}</b><button type="button" class="x-btn" data-act="rmsec" data-si="${si}" aria-label="Buang bahagian ${esc(T.label)}">${icon('trash', 'ic-sm')}</button></div>`;
    switch (s.type) {
      case 'kosong':
        h += fArea('Lokasi / premis yang diperiksa', `${p}.lokasi`, { ph: 'Satu lokasi setiap baris', rows: 3 });
        h += fArea('Catatan (pilihan)', `${p}.catatan`, { ph: 'Contoh: Hujan lebat, kawasan sedang dibersihkan', rows: 2 });
        h += `<span class="hint">Ayat rasmi "tiada penemuan" ditulis automatik dalam laporan. Tiada kesalahan atau tindakan perlu diisi.</span>`;
        break;
      case 'premis':
        h += fText('Perkara', `${p}.perkara`, { ph: 'Contoh: Pemeriksaan kesalahan penggunaan tempat letak kereta awam' });
        h += fArea('Lokasi / premis diperiksa', `${p}.lokasi`, { ph: 'Satu premis setiap baris', rows: 3 });
        h += kesalahanEditor(si, s);
        break;
      case 'permit':
        h += fArea('Premis / lokasi', `${p}.lokasi`, { ph: 'Satu premis setiap baris', rows: 2 });
        h += fSelect('Jenis permit', `${p}.jenisPermit`, ['Kaki lima', 'Petak letak kenderaan (bermusim)', 'Petak letak kenderaan (tahunan)', 'Lesen perniagaan', 'Lain-lain']);
        h += `<span class="label">Status</span>` + fChips(`${p}.status`, ['Patuh', 'Hampir tamat', 'Tamat tempoh', 'Tidak patuh']);
        h += kesalahanEditor(si, s);
        break;
      case 'kenderaan': {
        h += fText('Lokasi', `${p}.lokasi`, { icon: 'pin', ph: 'Contoh: Pekan Baki-Tarat' });
        h += `<div class="card-h"><span class="label">Kenderaan</span><span class="hint">${(s.kenderaan || []).length} kenderaan</span></div>`;
        (s.kenderaan || []).forEach((v, vi) => {
          const vp = `sections.${si}.kenderaan.${vi}`;
          h += `<div class="veh"><div class="card-h">${v.noPlat ? `<span class="plate">${esc(v.noPlat)}</span>` : '<span class="hint">Kenderaan ' + (vi + 1) + '</span>'}<span class="hint" style="flex:1">${v.scanning ? '<span class="spin" style="display:inline-block;vertical-align:middle;margin-right:6px"></span>AI sedang membaca plat…' : v.ai ? 'Diisi oleh AI, sila semak' : ''}</span><button type="button" class="x-btn" data-act="rmveh" data-si="${si}" data-vi="${vi}" aria-label="Buang kenderaan">${icon('x', 'ic-sm')}</button></div>
            ${fText('Jenis kenderaan', `${vp}.jenis`, { ph: 'Contoh: Perodua Bezza' })}<div class="row2">${fText('Warna', `${vp}.warna`, { ph: 'Silver' })}${fText('No. pendaftaran', `${vp}.noPlat`, { ph: 'QCH 5432', rerender: true })}</div></div>`;
        });
        h += `<button type="button" class="btn green block" data-act="scan" data-si="${si}">${icon('scan', 'ic-sm')} Imbas nombor plat</button><button type="button" class="btn dashed block" data-act="addveh" data-si="${si}">${icon('plus', 'ic-sm')} Tambah kenderaan secara manual</button>`;
        h += tindakanBox(`sections.${si}.tindakan`, ['larangan', 'amaran', 'tegas', 'nasihat']);
        h += `<span class="hint">Peruntukan: ${esc(W.cite('K', '27(1)'))}</span>`;
        break;
      }
      case 'mesyuarat':
        h += `<span class="label">Jenis</span>` + fChips(`${p}.jenis`, ['Mesyuarat', 'Taklimat', 'Kerja ukur', 'Lain-lain']);
        h += fText('Tajuk / perkara', `${p}.tajuk`, { ph: 'Contoh: Operasi Pusat Penjaja Serian' });
        h += fText('Tempat', `${p}.tempat`, { icon: 'pin', ph: 'Contoh: Kamar Majlis Daerah Serian' });
        break;
      case 'aduan':
        h += fText('Tajuk aduan', `${p}.tajuk`, { ph: 'Contoh: Pembakaran terbuka oleh jiran' });
        h += `<div class="row2">${fText('Pengadu', `${p}.pengadu`)}${fText('No. rujukan surat', `${p}.noRujukan`)}</div>`;
        h += `<div class="row2">${fText('Tarikh surat aduan', `${p}.tarikhSurat`, { type: 'date' })}${fText('Lokasi aduan', `${p}.lokasiAduan`)}</div>`;
        h += fArea('Keterangan aduan', `${p}.keterangan`, { ph: 'Apa yang diadukan oleh pengadu', rows: 3 });
        h += `<span class="label">Kesimpulan</span>` + fChips(`${p}.kesimpulan`, ['Sah', 'Tidak sah', 'Dalam tindakan']);
        h += kesalahanEditor(si, s);
        break;
      case 'susulan':
        if (s.ref) h += `<div class="note green" style="margin:0">${icon('repeat', 'ic-sm')}<span>Merujuk: ${esc(s.ref.label)}, ${esc(s.ref.premis || '')} (${W.fmtDate(s.ref.tarikh)})</span></div>`;
        h += `<button type="button" class="btn ${s.ref ? '' : 'green'} block" data-act="pickref" data-si="${si}">${icon('list', 'ic-sm')} ${s.ref ? 'Tukar laporan asal' : 'Pilih laporan asal'}</button>`;
        h += fText('Premis / tajuk', `${p}.tajuk`);
        h += fText('Lokasi', `${p}.lokasi`, { icon: 'pin' });
        h += fArea('Keterangan pemeriksaan asal', `${p}.asal`, { rows: 3, hint: 'Diisi automatik daripada laporan asal, boleh diubah.' });
        h += fText('Tujuan susulan', `${p}.tujuan`);
        h += `<span class="label">Status</span>` + fChips(`${p}.status`, ['Patuh', 'Tidak patuh', 'Sebahagian patuh']);
        h += kesalahanEditor(si, s);
        break;
      case 'ppw':
        h += fText('Lokasi / kawasan', `${p}.lokasi`, { icon: 'pin', ph: 'Contoh: Tarat Central dan Tarat Jaya' });
        h += fText('Bilangan poster disita / diturunkan', `${p}.bilangan`, { type: 'number', ph: 'Contoh: 16' });
        h += `<span class="hint">Keterangan dan punca kuasa PPW dimasukkan automatik ke dalam laporan.</span>`;
        break;
      case 'bersepadu':
        h += fText('Tajuk operasi', `${p}.tajuk`, { ph: 'Contoh: Pemeriksaan kenderaan terbiar bersama JPJ' });
        h += fText('Rujukan surat jemputan', `${p}.rujukanSurat`, { ph: 'Contoh: MDS/700/9 (33) bertarikh 17.01.2025' });
        h += `<span class="label">Agensi lain yang terlibat</span>`;
        (s.agensi || []).forEach((g, gi) => {
          h += `<div class="veh"><div class="card-h"><span class="hint">Agensi ${gi + 1}</span><button type="button" class="x-btn" data-act="rmag" data-si="${si}" data-i="${gi}" aria-label="Buang agensi">${icon('x', 'ic-sm')}</button></div>${fText('Nama agensi', `sections.${si}.agensi.${gi}.nama`, { ph: 'Contoh: Jabatan Pengangkutan Jalan Cawangan Serian' })}${fArea('Anggota agensi', `sections.${si}.agensi.${gi}.anggota`, { ph: 'Satu orang setiap baris: Nama, Jawatan dan Gred', rows: 3 })}</div>`;
        });
        h += `<button type="button" class="btn dashed block" data-act="addag" data-si="${si}">${icon('plus', 'ic-sm')} Tambah agensi</button>`;
        h += `<span class="label">Lokasi operasi</span>`;
        (s.lokasiOps || []).forEach((l, li) => {
          h += `<div class="veh"><div class="card-h"><span class="hint">Lokasi ${li + 1}</span><button type="button" class="x-btn" data-act="rmlok" data-si="${si}" data-i="${li}" aria-label="Buang lokasi">${icon('x', 'ic-sm')}</button></div>${fText('Nama lokasi', `sections.${si}.lokasiOps.${li}.nama`)}${fArea('Apa yang ditemui', `sections.${si}.lokasiOps.${li}.naratif`, { rows: 2 })}${fArea('Tindakan yang diambil', `sections.${si}.lokasiOps.${li}.tindakan`, { rows: 2 })}</div>`;
        });
        h += `<button type="button" class="btn dashed block" data-act="addlok" data-si="${si}">${icon('plus', 'ic-sm')} Tambah lokasi</button>`;
        break;
      case 'sitaan':
        h += fText('Tajuk operasi', `${p}.tajuk`, { ph: 'Contoh: Gerai jualan terbiar di hadapan premis Bombay Spices' });
        h += `<div class="row2">${fText('No. siri aduan', `${p}.noSiriAduan`)}${fText('Tarikh aduan', `${p}.tarikhAduan`, { type: 'date' })}</div>`;
        h += fArea('Barang yang disita', `${p}.barang`, { ph: 'Satu barang setiap baris', rows: 3 });
        h += `<div class="row2">${fText('No. repot polis', `${p}.noRepot`)}${fText('Tarikh repot', `${p}.tarikhRepot`, { type: 'date' })}</div>`;
        h += fText('Stor sitaan', `${p}.stor`, { ph: 'Contoh: Stor sitaan Bahagian Penguatkuasa' });
        h += fText('Agensi luar', `${p}.namaAgensi`, { ph: 'Contoh: Polis Diraja Malaysia, IPD Serian' });
        h += fArea('Anggota agensi luar', `${p}.agensiLuar`, { ph: 'Satu orang setiap baris: Nama, Jawatan', rows: 2 });
        h += kesalahanEditor(si, s);
        break;
    }
    if (s.type !== 'kosong') h += fArea('Nota tambahan untuk AI (pilihan)', `${p}.nota`, { ph: 'Fakta lain yang perlu disebut, contohnya: pemilik tiada di premis, diketuai oleh Penolong Ketua Bahagian', rows: 2 });
    h += photosBlock(si, s);
    return h + '</section>';
  }

  /* ---------- Skrin ---------- */
  function navBar(on) {
    return `<nav class="nav" aria-label="Navigasi utama"><a href="#/" class="${on === 'home' ? 'on' : ''}">${icon('home')}Utama</a><a href="#/senarai" class="${on === 'list' ? 'on' : ''}">${icon('file')}Laporan</a><a href="#/tetapan" class="${on === 'set' ? 'on' : ''}">${icon('gear')}Tetapan</a></nav>`;
  }

  async function renderHome() {
    const reports = (await DB.all('reports')).sort((a, b) => (b.tarikh + b.masaMula).localeCompare(a.tarikh + a.masaMula) || b.updatedAt - a.updatedAt);
    const mth = today().slice(0, 7);
    const monthR = reports.filter(r => r.status === 'siap' && (r.tarikh || '').startsWith(mth));
    let notis = 0, aduan = 0;
    monthR.forEach(r => r.sections.forEach(s => {
      (s.kesalahan || []).forEach(k => { if (k.tindakan && ['amaran', 'tegas', 'larangan', 'kompaun'].includes(k.tindakan.jenis)) notis++; });
      if (s.type === 'kenderaan' && s.tindakan && s.tindakan.jenis) notis += (s.kenderaan || []).length || 1;
      if (s.type === 'aduan') aduan++;
    }));
    const rem = reminderItems(reports);
    const dueNow = rem.filter(i => i.due <= today());
    const soon = rem.filter(i => i.due > today());
    const me = S.staff.find(x => x.id === (S.settings.penyedia || window.DEFAULT_PENYEDIA));
    const hr = new Date().getHours();
    const greet = hr < 12 ? 'Selamat pagi,' : hr < 15 ? 'Selamat tengah hari,' : hr < 19 ? 'Selamat petang,' : 'Selamat malam,';
    const [y, m] = mth.split('-');
    let h = `<div class="app with-nav"><div class="greet"><div><div class="hi">${greet}</div><div class="name">${esc(firstName(me ? me.nama : 'Penguatkuasa'))}</div></div><div style="display:flex;gap:10px">
      <button class="icon-btn gold ${S.settings.terik ? 'on' : ''}" data-act="terik" aria-label="Mod cahaya terik" aria-pressed="${!!S.settings.terik}">${icon('sun')}</button>
      <div class="avatar" aria-hidden="true">${esc(initials(me ? me.nama : 'MDS'))}</div></div></div>
      <div class="hero"><div class="row"><span class="month">${BULAN[Number(m) - 1]} ${y}</span><span class="pill gold">Sesi ${W.sesi(nowTimes()[0]).toLowerCase()}</span></div>
      <div class="big"><b>${monthR.length}</b><span>laporan bulan ini</span></div>
      <div class="stats"><div class="stat"><b>${notis}</b><span>Notis dan tindakan</span></div><div class="stat"><b>${rem.length}</b><span>Susulan</span></div><div class="stat"><b>${aduan}</b><span>Aduan</span></div></div></div>
      <button class="cta" data-act="new">${icon('plus')} Laporan baharu</button>`;
    if (S.installEvt) h += `<div style="padding:12px 20px 0"><button class="btn block" data-act="install">${icon('download', 'ic-sm')} Pasang aplikasi ke skrin utama</button></div>`;
    if (!S.settings.apiKey) h += `<a class="note" href="#/tetapan" style="text-decoration:none">${icon('key', 'ic-sm')}<span>Masukkan kunci Gemini dalam Tetapan untuk guna ciri AI.</span></a>`;
    dueNow.slice(0, 3).forEach(i => {
      h += `<div class="remind item"><div class="tile tone-amber">${icon('clock')}</div><div class="tx"><span class="t1">${esc(i.kind)}</span><span class="t2">${shortDate(i.due)} · ${esc(i.premis)}</span></div><button class="link-btn" data-act="startfu" data-key="${esc(i.key)}">Mula</button><button class="x-btn" data-act="donefu" data-key="${esc(i.key)}" aria-label="Tandakan selesai">${icon('check', 'ic-sm')}</button></div>`;
    });
    if (dueNow.length > 3) h += `<div class="hint" style="padding:8px 20px 0">dan ${dueNow.length - 3} lagi susulan</div>`;
    if (soon.length) h += `<div class="hint" style="padding:10px 20px 0">${icon('bell', 'ic-sm')} ${soon.length} susulan akan datang, yang terdekat ${shortDate(soon[0].due)} (${esc(soon[0].premis)})</div>`;
    h += `<div class="section-head"><h2>Laporan terkini</h2><a href="#/senarai">Lihat semua</a></div><div class="list">`;
    h += reports.length ? reports.slice(0, 5).map(itemRow).join('') : `<div class="empty">Belum ada laporan. Tekan "Laporan baharu" untuk mula.</div>`;
    h += `</div></div>${navBar('home')}`;
    app.innerHTML = h;
  }
  function itemRow(r) {
    const s0 = r.sections[0];
    const T = s0 ? window.REPORT_TYPES[s0.type] : { tone: 'gray', icon: 'file' };
    return `<button class="item" data-act="open" data-id="${r.id}"><div class="tile tone-${T.tone}">${icon(T.icon)}</div><div class="tx"><span class="t1">${esc(summaryOf(r))}</span><span class="t2">${esc(placeOf(r) || 'Tiada lokasi')}, ${W.fmtTime(r.masaMula).replace('hrs', '')} - ${W.fmtTime(r.masaTamat)}</span></div><div class="meta"><span>${shortDate(r.tarikh)}</span>${r.status === 'siap' ? '<span class="pill green">Siap</span>' : '<span class="pill amber">Draf</span>'}</div></button>`;
  }

  async function renderList() {
    const reports = (await DB.all('reports')).sort((a, b) => (b.tarikh + b.masaMula).localeCompare(a.tarikh + a.masaMula));
    const q = (S.listQ || '').toLowerCase();
    const filtered = reports.filter(r => !q || JSON.stringify([r.tempat, r.tarikh, W.fmtDate(r.tarikh), summaryOf(r), r.sections.map(s => [s.fields, (s.kesalahan || []).map(k => k.premis), (s.kenderaan || []).map(v => v.noPlat)])]).toLowerCase().includes(q));
    app.innerHTML = `<div class="app with-nav"><div class="top"><div class="title"><h1>Semua laporan</h1><span class="sub">${reports.length} laporan disimpan dalam telefon ini</span></div></div>
      <div style="padding:16px 20px 12px"><div class="with-icon">${icon('search')}<input class="input" id="listq" type="search" value="${esc(S.listQ || '')}" placeholder="Cari premis, lokasi, nombor plat" aria-label="Cari laporan"></div></div>
      <div class="list">${filtered.length ? filtered.map(itemRow).join('') : '<div class="empty">Tiada laporan.</div>'}</div></div>${navBar('list')}`;
  }

  async function renderSettings() {
    const st = S.settings;
    let h = `<div class="app with-nav"><div class="top"><div class="title"><h1>Tetapan</h1><span class="sub">Disimpan dalam telefon ini sahaja</span></div></div>
      <section class="card first"><div class="card-h"><span class="label">Kunci Gemini (AI)</span>${st.apiKey ? '<span class="pill green">Ada</span>' : '<span class="pill amber">Belum ada</span>'}</div>
      <input class="input" id="apikey" type="password" autocomplete="off" value="${esc(st.apiKey || '')}" placeholder="Tampal kunci di sini" aria-label="Kunci Gemini">
      <div class="row2"><button class="btn green" data-act="savekey">${icon('check', 'ic-sm')} Simpan dan uji</button><a class="btn" href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener">${icon('key', 'ic-sm')} Dapatkan kunci</a></div>
      <span class="hint">${st.model ? 'Model: ' + esc(st.model) : 'Kunci percuma boleh didapati daripada Google AI Studio menggunakan akaun Google.'}</span></section>
      <section class="card"><div class="settings-row"><div><div class="label">Mod cahaya terik</div><div class="hint">Kontras tinggi untuk skrin di bawah matahari</div></div><button class="chip ${st.terik ? 'on' : ''}" data-act="terik" aria-pressed="${!!st.terik}">${st.terik ? 'Hidup' : 'Mati'}</button></div></section>
      <section class="card"><label class="label" for="penyedia">Laporan disediakan oleh (lalai)</label><select class="select" id="penyedia">${S.staff.map(s => `<option value="${s.id}" ${s.id === (st.penyedia || window.DEFAULT_PENYEDIA) ? 'selected' : ''}>${esc(s.nama)}</option>`).join('')}</select></section>
      <section class="card"><div class="card-h"><span class="label">Senarai anggota</span><span class="hint">${S.staff.length} orang</span></div>`;
    S.staff.forEach((s, i) => {
      h += `<div class="staff-edit"><div class="fields"><input class="input" data-staff="${i}" data-k="nama" value="${esc(s.nama)}" aria-label="Nama penuh anggota ${i + 1}" placeholder="Nama penuh"><input class="input" data-staff="${i}" data-k="jawatan" value="${esc(s.jawatan)}" aria-label="Jawatan dan gred anggota ${i + 1}" placeholder="Jawatan dan gred"></div><button class="x-btn" data-act="rmstaff" data-i="${i}" aria-label="Buang ${esc(s.nama)}">${icon('trash', 'ic-sm')}</button></div>`;
    });
    h += `<button class="btn dashed block" data-act="addstaff">${icon('plus', 'ic-sm')} Tambah anggota</button></section>
      <section class="card"><span class="label">Tentang</span><span class="hint">Laporan Rondaan versi 1.0. Laporan dan gambar disimpan dalam telefon ini sahaja. Fail Word disimpan dalam folder Muat Turun.</span></section></div>${navBar('set')}`;
    app.innerHTML = h;
  }

  async function renderEdit() {
    const r = S.report;
    await loadUrls(r);
    const counts = {};
    r.sections.forEach(s => counts[s.type] = (counts[s.type] || 0) + 1);
    let h = `<div class="app"><div class="top"><a href="#/" class="icon-btn" aria-label="Kembali ke utama">${icon('back')}</a><div class="title"><h1>${r.status === 'siap' ? 'Sunting laporan' : 'Laporan baharu'}</h1><span class="sub">Langkah 1 daripada 2</span></div><button class="icon-btn" data-act="delrep" aria-label="Padam laporan">${icon('trash')}</button></div>
      <div class="progress"><div style="width:50%"></div></div>
      <section class="card first"><span class="label">Tarikh dan masa</span>
        <div class="with-icon">${icon('cal')}<input class="input" type="date" data-bind="tarikh" data-rerender value="${esc(r.tarikh)}" aria-label="Tarikh"></div>
        <div class="row2"><button class="timebtn on" data-act="time" data-path="masaMula"><span class="k">Mula</span><span class="v">${esc(r.masaMula)}</span></button><button class="timebtn" data-act="time" data-path="masaTamat"><span class="k">Tamat</span><span class="v">${esc(r.masaTamat)}</span></button></div>
        <span class="pill green" style="align-self:flex-start">Sesi ${W.sesi(r.masaMula).toLowerCase()}, ${W.dayName(r.tarikh)} ${W.fmtDate(r.tarikh)}</span></section>
      <section class="card">${fText('Tempat (umum)', 'tempat', { icon: 'pin', ph: 'Contoh: Sekitar Bandar Serian' })}</section>
      <section class="card"><div class="card-h"><span class="label">Tambah bahagian laporan</span><span class="hint">${r.sections.length} bahagian</span></div><div class="chips">${window.REPORT_ORDER.map(t => `<button type="button" class="chip ${counts[t] ? 'on' : ''}" data-act="addsec" data-type="${t}">${counts[t] ? icon('check', 'ic-sm') : icon('plus', 'ic-sm')}${esc(window.REPORT_TYPES[t].short)}${counts[t] > 1 ? ' ×' + counts[t] : ''}</button>`).join('')}</div><span class="hint">Satu laporan boleh mengandungi beberapa jenis. Tekan sekali lagi untuk tambah bahagian yang sama.</span></section>`;
    r.sections.forEach((s, si) => { h += sectionCard(s, si); });
    h += `<section class="card"><div class="card-h"><span class="label">Anggota terlibat</span><span class="hint">${r.anggota.length} dipilih</span></div><div class="staff-grid">${S.staff.map(s => { const on = r.anggota.includes(s.id); return `<button type="button" class="staff ${on ? 'on' : ''}" aria-pressed="${on}" data-act="staff" data-id="${s.id}"><span class="ini">${esc(initials(s.nama))}</span>${esc(firstName(s.nama))}</button>`; }).join('')}</div>
      ${fSelect('Laporan disediakan oleh', 'penyedia', S.staff.map(s => [s.id, s.nama]))}</section>`;
    h += `<div style="height:20px"></div></div><div class="bottom-bar"><div class="inner"><button class="big-btn" data-act="toai">${icon('spark')} Seterusnya: tulis penerangan</button></div></div>`;
    app.innerHTML = h;
  }

  function localChecks(r) {
    const out = [];
    const err = (msg, sid) => out.push({ level: 'err', msg, sid });
    const warn = (msg, sid) => out.push({ level: 'warn', msg, sid });
    if (!r.sections.length) err('Belum ada bahagian laporan.');
    if (r.masaTamat <= r.masaMula) err(`Masa tamat (${r.masaTamat}) tidak selepas masa mula (${r.masaMula}).`);
    if (!r.tempat) warn('Tempat (umum) belum diisi.');
    if (!r.anggota.length) err('Belum ada anggota terlibat dipilih.');
    const byId = Object.fromEntries(S.staff.map(s => [s.id, s]));
    r.anggota.forEach(id => { const a = byId[id]; if (a && !a.jawatan) warn(`Jawatan ${a.nama} kosong. Lengkapkan dalam Tetapan.`); });
    if (!byId[r.penyedia]) err('"Laporan disediakan oleh" belum dipilih.');
    r.sections.forEach(s => {
      const L = window.REPORT_TYPES[s.type].label;
      const f = s.fields;
      Object.keys(window.AI.KEYS[s.type]).forEach(k => { if (!String(s.ai[k] || '').trim()) err(`${L}: penerangan "${k === 'hasil' ? 'hasil' : k}" masih kosong.`, s.id); });
      (s.kesalahan || []).forEach(k => {
        if (!k.premis) warn(`${L}: nama premis untuk "${k.label || k.butiran}" kosong.`, s.id);
        if (k.custom && !k.customCite) warn(`${L}: rujukan undang-undang untuk kesalahan lain belum diisi.`, s.id);
        const t = k.tindakan || {};
        if (!t.jenis) warn(`${L}: tindakan untuk "${k.label || k.butiran}" belum dipilih.`, s.id);
        if (['amaran', 'tegas', 'larangan'].includes(t.jenis) && (t.tempohHari === '' || t.tempohHari == null)) warn(`${L}: tempoh untuk ${window.TINDAKAN[t.jenis].label.toLowerCase()} belum diisi.`, s.id);
        if (t.jenis === 'kompaun' && !t.tarikhBayar) warn(`${L}: tarikh akhir bayaran kompaun belum diisi.`, s.id);
      });
      if (s.type === 'kenderaan') {
        if (!(s.kenderaan || []).length) warn('Kenderaan terbiar: belum ada kenderaan.', s.id);
        (s.kenderaan || []).forEach((v, i) => { if (!v.noPlat && !v.jenis) warn(`Kenderaan ${i + 1}: jenis dan nombor plat kosong.`, s.id); });
      }
      if (s.type === 'aduan' && !f.tajuk) warn('Aduan awam: tajuk aduan kosong.', s.id);
      if (s.type === 'susulan' && !f.status) warn('Susulan: status pematuhan belum dipilih.', s.id);
      if (s.type === 'ppw' && !f.bilangan) warn('PPW: bilangan poster belum diisi.', s.id);
      if (s.type === 'kosong' && !String(f.lokasi || '').trim()) warn(`${L}: lokasi / premis yang diperiksa belum diisi.`, s.id);
      if (!(s.photos || []).length && !['mesyuarat', 'kosong'].includes(s.type)) warn(`${L}: tiada gambar.`, s.id);
      if (['susulan', 'sitaan'].includes(s.type) && (s.photos || []).length && !(s.photos || []).some(p => p.label)) warn(`${L}: gambar belum dilabel Sebelum / Selepas.`, s.id);
    });
    return out;
  }

  async function renderAI() {
    const r = S.report;
    const nKes = r.sections.reduce((a, s) => a + (s.kesalahan || []).length, 0);
    const nVeh = r.sections.reduce((a, s) => a + (s.kenderaan || []).length, 0);
    const nPh = r.sections.reduce((a, s) => a + (s.photos || []).length, 0);
    const facts = [W.fmtDate(r.tarikh), `${W.fmtTime(r.masaMula)} - ${W.fmtTime(r.masaTamat)}`, r.tempat, nKes ? `${nKes} kesalahan` : '', nVeh ? `${nVeh} kenderaan` : '', `${r.anggota.length} anggota`, `${nPh} gambar`].filter(Boolean);
    let h = `<div class="app"><div class="top"><a href="#/laporan/${r.id}" class="icon-btn" aria-label="Kembali ke maklumat">${icon('back')}</a><div class="title"><h1>Penerangan pemeriksaan</h1><span class="sub">Langkah 2 daripada 2</span></div></div>
      <div class="progress"><div style="width:100%"></div></div>
      <div class="facts" style="margin-top:16px">${facts.map(f => `<span class="pill white">${esc(f)}</span>`).join('')}</div>`;
    if (!S.settings.apiKey) h += `<a class="note" href="#/tetapan" style="text-decoration:none">${icon('key', 'ic-sm')}<span>Kunci Gemini belum dimasukkan. Awak masih boleh menaip penerangan sendiri, atau masukkan kunci dalam Tetapan.</span></a>`;
    h += `<div style="padding:14px 20px 0"><button class="btn gold block" data-act="aiall" ${S.busy ? 'disabled' : ''}>${S.busy === 'all' ? '<span class="spin"></span> AI sedang menulis…' : icon('spark', 'ic-sm') + ' Tulis semua dengan AI'}</button></div>`;
    r.sections.forEach((s, si) => {
      const T = window.REPORT_TYPES[s.type];
      const where = firstLine(s.fields.lokasi || s.fields.tajuk || s.fields.lokasiAduan || '');
      h += `<section class="card"><div class="ai-head"><div class="ai-badge">${icon('spark', 'ic-sm')}</div><div style="display:flex;flex-direction:column;gap:1px;flex:1;min-width:0"><b style="font-size:14px">${esc(T.label)}</b><span class="hint">${esc(where || 'Tekan teks untuk ubah')}</span></div><button class="link-btn" data-act="aione" data-si="${si}" ${S.busy ? 'disabled' : ''}>${S.busy === s.id ? 'Menulis…' : 'Tulis semula'}</button></div>`;
      Object.entries(window.AI.KEYS[s.type]).forEach(([k]) => {
        const lbl = { hasil: 'Hasil pemeriksaan', kesimpulan: 'Kesimpulan', keterangan: 'Keterangan operasi', rumusan: 'Rumusan', latarBelakang: 'Latar belakang', kronologi: 'Kronologi tindakan' }[k] || k;
        h += fArea(lbl, `sections.${si}.ai.${k}`, { tall: k === 'hasil' || k === 'kronologi', rows: 6, ph: 'Tekan "Tulis dengan AI" atau taip sendiri' });
      });
      h += '</section>';
    });
    // semakan
    const checks = S.checks || null;
    h += `<section class="card"><div class="card-h"><b style="font-size:14px">Semakan sebelum jana</b><button class="link-btn" data-act="check" ${S.busy ? 'disabled' : ''}>${S.busy === 'check' ? 'Menyemak…' : checks ? 'Semak semula' : 'Semak sekarang'}</button></div>`;
    if (!checks) h += `<span class="hint">Semakan membandingkan penerangan dengan maklumat yang diisi, dan memastikan tiada ruang penting yang tertinggal.</span>`;
    else if (!checks.length) h += `<div class="check"><span class="dot ok">${icon('check', 'ic-sm')}</span><span class="msg">Tiada masalah ditemui.</span></div>`;
    else checks.forEach(c => { h += `<div class="check"><span class="dot ${c.level}">${icon(c.level === 'ok' ? 'check' : 'info', 'ic-sm')}</span><span class="msg">${esc(c.msg)}${c.src === 'ai' ? ' <span class="hint">(AI)</span>' : ''}</span>${c.level !== 'ok' ? `<a class="link-btn" href="#/laporan/${r.id}">Betulkan</a>` : ''}</div>`; });
    h += '</section>';
    h += `<div style="height:20px"></div></div><div class="bottom-bar"><div class="inner"><button class="big-btn gold" data-act="generate" ${S.busy ? 'disabled' : ''}>${S.busy === 'gen' ? '<span class="spin"></span> Menjana…' : icon('file') + ' Jana laporan Word'}</button></div></div>`;
    app.innerHTML = h;
  }

  async function renderDone() {
    const r = S.report;
    const due = [];
    r.sections.forEach(s => {
      (s.kesalahan || []).forEach(k => { const t = k.tindakan || {}; if (t.tarikhAkhir && Number(t.tempohHari) > 0) due.push(`${k.premis || 'Premis'}: susulan ${W.fmtDate(t.tarikhAkhir)}`); if (t.jenis === 'kompaun' && t.tarikhBayar) due.push(`${k.premis || 'Premis'}: semak kompaun ${W.fmtDate(t.tarikhBayar)}`); });
      if (s.type === 'kenderaan' && s.tindakan && s.tindakan.tarikhAkhir && Number(s.tindakan.tempohHari) > 0) due.push(`Kenderaan terbiar: susulan ${W.fmtDate(s.tindakan.tarikhAkhir)}`);
    });
    app.innerHTML = `<div class="done-screen"><div class="app" style="padding-bottom:20px"><div class="done-head"><div class="done-check">${icon('check')}</div><h1>Laporan siap</h1><span>Disimpan dalam folder Muat Turun</span></div>
      <div class="file-row"><div class="w">W</div><div class="tx"><span class="t1">${esc(r.fileName || '')}</span><span class="t2">${esc(summaryOf(r))}</span></div></div>
      ${due.length ? `<div class="done-list">${due.map(d => `<span class="pill gold">${icon('bell', 'ic-sm')} ${esc(d)}</span>`).join('')}</div>` : ''}
      <div class="done-actions"><button class="big-btn gold" data-act="redownload" style="flex:none">${icon('download')} Muat turun semula</button>
      <div class="row2"><button class="btn" data-act="share">${icon('share', 'ic-sm')} Kongsi</button><a class="btn" href="#/" style="background:var(--green-2);color:#fff;min-height:52px;border-radius:16px">${icon('home', 'ic-sm')} Ke utama</a></div>
      <a class="btn" href="#/laporan/${r.id}" style="background:transparent;color:#fff;border:1.5px solid var(--green-ink)">${icon('edit', 'ic-sm')} Sunting dan jana semula</a></div></div></div>`;
  }

  /* ---------- Penghala ---------- */
  async function route() {
    closeSheet();
    const h = location.hash.replace(/^#/, '') || '/';
    const [, page, id] = h.split('/');
    window.scrollTo(0, 0);
    if (!page) return renderHome();
    if (page === 'senarai') return renderList();
    if (page === 'tetapan') return renderSettings();
    if (['laporan', 'ai', 'siap'].includes(page)) {
      if (!S.report || S.report.id !== id) {
        const r = await DB.get('reports', id);
        if (!r) { location.hash = '#/'; return; }
        S.report = r; S.checks = null;
      }
      if (page === 'laporan') return renderEdit();
      if (page === 'ai') return renderAI();
      return renderDone();
    }
    location.hash = '#/';
  }
  function render() {
    const y = window.scrollY;
    const h = location.hash;
    const p = h.startsWith('#/laporan') ? renderEdit() : h.startsWith('#/ai') ? renderAI() : h.startsWith('#/siap') ? renderDone() : h.startsWith('#/senarai') ? renderList() : h.startsWith('#/tetapan') ? renderSettings() : renderHome();
    Promise.resolve(p).then(() => window.scrollTo(0, y));
  }

  /* ---------- Tindakan ---------- */
  async function generate() {
    const r = S.report;
    const errs = localChecks(r).filter(c => c.level === 'err');
    if (errs.length) {
      S.checks = localChecks(r);
      render();
      const go = await confirmSheet('Belum lengkap', `${errs.length} perkara penting belum lengkap, contohnya: ${errs[0].msg} Jana juga?`, 'Jana juga', false);
      if (!go) return;
    }
    S.busy = 'gen'; render();
    try {
      await saveNow();
      const photos = {};
      for (const s of r.sections) for (const p of s.photos || []) {
        if (photos[p.id]) continue;
        const rec = await DB.get('photos', p.id);
        if (rec) photos[p.id] = { bytes: new Uint8Array(await rec.blob.arrayBuffer()), mime: rec.mime || 'image/jpeg', w: rec.w, h: rec.h };
      }
      let logo = null;
      try { const lb = await (await fetch('logo-mds.jpg')).arrayBuffer(); logo = { bytes: new Uint8Array(lb), mime: 'image/jpeg', w: 183, h: 185 }; } catch (e) { /* tanpa logo */ }
      const blob = await W.build(r, { staff: S.staff, photos, logo });
      const all = await DB.all('reports');
      r.fileName = r.fileName && r.status === 'siap' ? r.fileName : fileName(r, all);
      r.status = 'siap';
      r.generatedAt = Date.now();
      await DB.put('files', { id: r.id, blob, name: r.fileName });
      // tandakan susulan yang telah dibuat
      r.sections.forEach(s => { if (s.type === 'susulan' && s.ref && s.ref.key && !S.done.includes(s.ref.key)) S.done.push(s.ref.key); });
      await DB.setKv('doneReminders', S.done);
      await saveNow();
      download(blob, r.fileName);
      S.busy = null;
      location.hash = `#/siap/${r.id}`;
    } catch (e) {
      console.error(e);
      S.busy = null; render();
      toast('Laporan tidak dapat dijana: ' + (e.message || e));
    }
  }
  function download(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 5000);
  }
  async function aiWrite(onlyId) {
    S.busy = onlyId || 'all'; render();
    try {
      const map = await window.AI.writeDescriptions(S.report, S.staff, onlyId);
      let n = 0;
      S.report.sections.forEach(s => {
        const b = map[s.id];
        if (!b) return;
        Object.keys(window.AI.KEYS[s.type]).forEach(k => { if (typeof b[k] === 'string' && b[k].trim()) { s.ai[k] = b[k].trim(); n++; } });
      });
      await saveNow();
      S.checks = null;
      toast(n ? 'Penerangan siap. Semak dan ubah jika perlu.' : 'AI tidak memberi penerangan. Cuba sekali lagi.');
    } catch (e) { toast(e.friendly || ('AI gagal: ' + e.message), 4500); }
    S.busy = null; render();
  }
  async function runChecks() {
    S.busy = 'check'; render();
    let list = localChecks(S.report);
    if (S.settings.apiKey && navigator.onLine && S.report.sections.some(s => Object.values(s.ai || {}).some(v => String(v).trim()))) {
      try {
        const ai = await window.AI.checkReport(S.report, S.staff);
        list = list.concat(ai.map(x => ({ level: 'warn', msg: x.mesej, sid: x.id, src: 'ai' })));
      } catch (e) { toast(e.friendly || 'Semakan AI gagal, semakan asas sahaja dipaparkan.'); }
    }
    S.checks = list;
    S.busy = null; render();
  }
  async function scanPlate(si) {
    const files = await pickFiles({ camera: true });
    if (!files.length) return;
    const added = await addPhotos(files);
    if (!added.length) return;
    const s = S.report.sections[si];
    s.photos.push({ id: added[0].id, caption: '', label: '' });
    const v = { id: uid('v'), jenis: '', warna: '', noPlat: '', photoId: added[0].id, scanning: true };
    s.kenderaan.push(v);
    await saveNow(); render();
    try {
      const out = await window.AI.scanPlate(added[0].blob);
      v.noPlat = String(out.noPlat || '').toUpperCase().trim();
      v.jenis = out.jenis || '';
      v.warna = out.warna || '';
      v.ai = true;
      if (!v.noPlat) toast('Nombor plat tidak jelas. Sila isi sendiri.');
      s.photos[s.photos.length - 1].caption = [v.jenis, v.noPlat].filter(Boolean).join(' - ');
    } catch (e) { toast(e.friendly || ('Imbasan gagal: ' + e.message), 4500); }
    v.scanning = false;
    await saveNow(); render();
  }
  async function startFollowup(key) {
    const reports = await DB.all('reports');
    const it = reminderItems(reports).find(i => i.key === key);
    if (!it) return;
    const r = newReport();
    r.tempat = it.premis || it.r.tempat;
    r.anggota = [...new Set([...(it.r.anggota || []), ...r.anggota])].filter(id => S.staff.some(s => s.id === id));
    const sec = newSection('susulan');
    applyRef(sec, it);
    r.sections.push(sec);
    await DB.put('reports', r);
    S.report = r; S.checks = null;
    location.hash = `#/laporan/${r.id}`;
  }

  app.addEventListener('click', async e => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    const r = S.report;
    const si = b.dataset.si != null ? Number(b.dataset.si) : null;
    switch (act) {
      case 'new': { const nr = newReport(); await DB.put('reports', nr); S.report = nr; S.checks = null; location.hash = `#/laporan/${nr.id}`; break; }
      case 'open': { const x = await DB.get('reports', b.dataset.id); S.report = x; S.checks = null; location.hash = x.status === 'siap' ? `#/siap/${x.id}` : `#/laporan/${x.id}`; break; }
      case 'terik': S.settings.terik = !S.settings.terik; await DB.setKv('settings', S.settings); applyTerik(); render(); break;
      case 'install': if (S.installEvt) { S.installEvt.prompt(); S.installEvt = null; render(); } break;
      case 'startfu': startFollowup(b.dataset.key); break;
      case 'donefu': S.done.push(b.dataset.key); await DB.setKv('doneReminders', S.done); toast('Ditandakan selesai.'); render(); break;
      case 'time': timeSheet(b.dataset.path); break;
      case 'addsec': { const s = newSection(b.dataset.type); r.sections.push(s); await saveNow(); await renderEdit(); const el = document.getElementById('sec-' + s.id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); break; }
      case 'rmsec': if (await confirmSheet('Buang bahagian?', `Bahagian ${window.REPORT_TYPES[r.sections[si].type].label} dan isinya akan dibuang.`, 'Buang', true)) { r.sections.splice(si, 1); scheduleSave(); render(); } break;
      case 'addkes': bylawSheet(si); break;
      case 'rmkes': r.sections[si].kesalahan.splice(Number(b.dataset.ki), 1); scheduleSave(); render(); break;
      case 'tindakan': { const t = getPath(r, b.dataset.path) || {}; t.jenis = b.dataset.val; if (window.TINDAKAN[t.jenis].fields.includes('tempoh') && (t.tempohHari === '' || t.tempohHari == null)) t.tempohHari = t.jenis === 'larangan' ? 7 : 5; setPath(r, b.dataset.path, t); normalize(r); scheduleSave(); render(); break; }
      case 'tempoh': setPath(r, b.dataset.path + '.tempohHari', Number(b.dataset.val)); normalize(r); scheduleSave(); render(); break;
      case 'setval': { const cur = getPath(r, b.dataset.path); setPath(r, b.dataset.path, cur === b.dataset.val ? '' : b.dataset.val); scheduleSave(); render(); break; }
      case 'addveh': r.sections[si].kenderaan.push({ id: uid('v'), jenis: '', warna: '', noPlat: '' }); scheduleSave(); render(); break;
      case 'rmveh': r.sections[si].kenderaan.splice(Number(b.dataset.vi), 1); scheduleSave(); render(); break;
      case 'scan': scanPlate(si); break;
      case 'addag': r.sections[si].agensi.push({ id: uid('g'), nama: '', anggota: '' }); scheduleSave(); render(); break;
      case 'rmag': r.sections[si].agensi.splice(Number(b.dataset.i), 1); scheduleSave(); render(); break;
      case 'addlok': r.sections[si].lokasiOps.push({ id: uid('l'), nama: '', naratif: '', tindakan: '' }); scheduleSave(); render(); break;
      case 'rmlok': r.sections[si].lokasiOps.splice(Number(b.dataset.i), 1); scheduleSave(); render(); break;
      case 'pickref': refSheet(si); break;
      case 'cam': case 'gal': {
        const files = await pickFiles({ camera: act === 'cam', multiple: act === 'gal' });
        if (!files.length) break;
        const added = await addPhotos(files);
        const s = r.sections[si];
        const lab = ['susulan', 'sitaan'].includes(s.type) ? (s.photos.some(p => p.label === 'Sebelum') ? 'Selepas' : 'Sebelum') : '';
        added.forEach(a => s.photos.push({ id: a.id, caption: '', label: lab }));
        scheduleSave(); render(); break;
      }
      case 'rmph': r.sections[si].photos.splice(Number(b.dataset.pi), 1); scheduleSave(); render(); break;
      case 'phlabel': { const p = r.sections[si].photos[Number(b.dataset.pi)]; p.label = p.label === b.dataset.val ? '' : b.dataset.val; scheduleSave(); render(); break; }
      case 'staff': { const id = b.dataset.id; r.anggota = r.anggota.includes(id) ? r.anggota.filter(x => x !== id) : [...r.anggota, id]; r.anggota.sort((a, c) => S.staff.findIndex(s => s.id === a) - S.staff.findIndex(s => s.id === c)); scheduleSave(); render(); break; }
      case 'delrep': if (await confirmSheet('Padam laporan?', 'Laporan ini akan dipadam daripada telefon. Fail Word yang sudah dimuat turun tidak terjejas.', 'Padam', true)) { await DB.del('reports', r.id); await DB.del('files', r.id); S.report = null; location.hash = '#/'; } break;
      case 'toai': {
        await saveNow();
        if (!r.sections.length) { toast('Tambah sekurang-kurangnya satu bahagian laporan dahulu.'); break; }
        location.hash = `#/ai/${r.id}`; break;
      }
      case 'aiall': aiWrite(null); break;
      case 'aione': aiWrite(r.sections[si].id); break;
      case 'check': runChecks(); break;
      case 'generate': generate(); break;
      case 'redownload': { const f = await DB.get('files', r.id); if (f) download(f.blob, f.name); else toast('Fail tidak dijumpai. Jana semula daripada Sunting.'); break; }
      case 'share': {
        const f = await DB.get('files', r.id);
        if (!f) { toast('Fail tidak dijumpai.'); break; }
        const file = new File([f.blob], f.name, { type: f.blob.type });
        if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: f.name }); } catch (e2) { /* dibatalkan */ } }
        else toast('Telefon ini tidak menyokong kongsi fail. Guna Muat turun semula.');
        break;
      }
      case 'savekey': {
        const key = document.getElementById('apikey').value.trim();
        if (!key) { S.settings.apiKey = ''; S.settings.model = ''; await DB.setKv('settings', S.settings); toast('Kunci dibuang.'); render(); break; }
        b.disabled = true; b.innerHTML = '<span class="spin"></span> Menguji…';
        try { const model = await window.AI.testKey(key); S.settings.apiKey = key; S.settings.model = model; await DB.setKv('settings', S.settings); toast('Kunci berfungsi.'); }
        catch (e2) { toast(e2.friendly || ('Kunci tidak berfungsi: ' + e2.message), 5000); }
        render(); break;
      }
      case 'addstaff': S.staff.push({ id: uid('a'), nama: '', jawatan: '' }); await DB.setKv('staff', S.staff); render(); break;
      case 'rmstaff': { const s = S.staff[Number(b.dataset.i)]; if (await confirmSheet('Buang anggota?', `${s.nama || 'Anggota ini'} akan dibuang daripada senarai.`, 'Buang', true)) { S.staff.splice(Number(b.dataset.i), 1); await DB.setKv('staff', S.staff); render(); } break; }
    }
  });

  function onField(e, isChange) {
    const t = e.target;
    if (t.id === 'listq') { S.listQ = t.value; if (isChange || true) { clearTimeout(S.lt); S.lt = setTimeout(async () => { await renderList(); const i = document.getElementById('listq'); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }, 250); } return; }
    if (t.id === 'penyedia' && !t.dataset.bind) { if (isChange) { S.settings.penyedia = t.value; DB.setKv('settings', S.settings); } return; }
    if (t.dataset.staff != null) { S.staff[Number(t.dataset.staff)][t.dataset.k] = t.value; clearTimeout(S.st); S.st = setTimeout(() => DB.setKv('staff', S.staff), 400); return; }
    const path = t.dataset.bind;
    if (!path || !S.report) return;
    let v = t.value;
    if (t.dataset.num != null) v = v === '' ? '' : Math.max(0, Number(v));
    setPath(S.report, path, v);
    if (/tempohHari$|^tarikh$/.test(path)) normalize(S.report);
    scheduleSave();
    if (isChange && t.dataset.rerender != null) render();
  }
  app.addEventListener('input', e => onField(e, false));
  app.addEventListener('change', e => onField(e, true));

  function applyTerik() { document.body.classList.toggle('terik', !!S.settings.terik); }

  /* ---------- Mula ---------- */
  async function boot() {
    S.staff = await DB.kv('staff', null);
    if (!S.staff) { S.staff = JSON.parse(JSON.stringify(window.DEFAULT_STAFF)); await DB.setKv('staff', S.staff); }
    S.settings = await DB.kv('settings', {}) || {};
    S.usage = await DB.kv('usage', {}) || {};
    S.done = await DB.kv('doneReminders', []) || [];
    applyTerik();
    window.addEventListener('hashchange', route);
    window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); S.installEvt = e; if (!location.hash || location.hash === '#/') render(); });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveNow(); });
    await route();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
  }
  boot();

  window.__app = { S, localChecks, normalize };
})();
