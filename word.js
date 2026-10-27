/* Penjana fail Word (.docx) tanpa pustaka luar.
   Fail .docx ialah arkib ZIP yang mengandungi fail XML. */
(function () {
  'use strict';

  /* ---------- ZIP (tanpa mampatan) ---------- */
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })();
  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    return (c ^ 0xFFFFFFFF) >>> 0;
  }
  function zip(files) {
    const enc = new TextEncoder();
    const now = new Date();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
    const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    const parts = [];
    const central = [];
    let offset = 0;
    for (const f of files) {
      const name = enc.encode(f.name);
      const data = typeof f.data === 'string' ? enc.encode(f.data) : f.data;
      const crc = crc32(data);
      const lh = new DataView(new ArrayBuffer(30));
      lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
      lh.setUint16(8, 0, true); lh.setUint16(10, dosTime, true); lh.setUint16(12, dosDate, true);
      lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true);
      lh.setUint16(26, name.length, true); lh.setUint16(28, 0, true);
      parts.push(new Uint8Array(lh.buffer), name, data);
      const ch = new DataView(new ArrayBuffer(46));
      ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true);
      ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true); ch.setUint16(12, dosTime, true);
      ch.setUint16(14, dosDate, true); ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true);
      ch.setUint32(24, data.length, true); ch.setUint16(28, name.length, true); ch.setUint16(30, 0, true);
      ch.setUint16(32, 0, true); ch.setUint16(34, 0, true); ch.setUint16(36, 0, true);
      ch.setUint32(38, 0, true); ch.setUint32(42, offset, true);
      central.push(new Uint8Array(ch.buffer), name);
      offset += 30 + name.length + data.length;
    }
    const cdSize = central.reduce((s, p) => s + p.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
    return new Blob([...parts, ...central, new Uint8Array(end.buffer)], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  }

  /* ---------- Format ---------- */
  const HARI = ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'];
  function fmtDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    return `${d}.${m}.${y}`;
  }
  function dayName(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    return HARI[new Date(y, m - 1, d).getDay()];
  }
  function fmtTime(t) { return t ? t.replace(':', '') + 'hrs' : ''; }
  function sesi(t) { return t && t < '12:00' ? 'Pagi' : 'Petang'; }
  function cite(law, ref) {
    const L = window.LAWS[law];
    if (!L || law === 'X') return ref || '';
    if (law === 'P') {
      if (/^Peraturan/i.test(ref)) return `${ref}, Peraturan-Peraturan Pemberi Pinjam Wang (Kawalan dan Perlesenan) 2003`;
      return `${ref}, ${L.cite}`;
    }
    return `${L.prefix} ${ref}, ${L.cite}`;
  }
  function citeList(k) {
    if (k.customCite) return k.customCite;
    return (k.cites || []).map(c => cite(c[0], c[1])).join(' dan ');
  }
  function addDays(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d + Number(n || 0));
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  }
  function splitParas(text) {
    return String(text || '').split(/\n\s*\n|\r?\n/).map(s => s.trim()).filter(Boolean);
  }

  /* ---------- XML ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function run(text, o = {}) {
    let rpr = '';
    if (o.b) rpr += '<w:b/>';
    if (o.i) rpr += '<w:i/>';
    if (o.u) rpr += '<w:u w:val="single"/>';
    if (o.caps) rpr += '<w:caps/>';
    if (o.sz) rpr += `<w:sz w:val="${o.sz}"/><w:szCs w:val="${o.sz}"/>`;
    if (o.color) rpr += `<w:color w:val="${o.color}"/>`;
    const lines = String(text == null ? '' : text).split('\n');
    const body = lines.map((l, i) => (i ? '<w:br/>' : '') + l.split('\t').map((t, j) => (j ? '<w:tab/>' : '') + `<w:t xml:space="preserve">${esc(t)}</w:t>`).join('')).join('');
    return `<w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ''}${body}</w:r>`;
  }
  function para(content, o = {}) {
    let ppr = '';
    if (o.keepNext) ppr += '<w:keepNext/>';
    if (o.tabs) ppr += `<w:tabs>${o.tabs.map(t => `<w:tab w:val="left" w:pos="${t}"/>`).join('')}</w:tabs>`;
    const after = o.after != null ? o.after : 120;
    const before = o.before || 0;
    const line = o.line || 240;
    ppr += `<w:spacing w:before="${before}" w:after="${after}" w:line="${line}" w:lineRule="auto"/>`;
    if (o.ind) ppr += `<w:ind w:left="${o.ind.left || 0}" w:hanging="${o.ind.hanging || 0}"/>`;
    if (o.jc) ppr += `<w:jc w:val="${o.jc}"/>`;
    const runs = Array.isArray(content) ? content.join('') : (typeof content === 'string' && content.startsWith('<w:r') ? content : run(content, o.r || {}));
    return `<w:p><w:pPr>${ppr}</w:pPr>${runs}</w:p>`;
  }
  const blank = () => para('', { after: 0 });

  function table(widths, rows, o = {}) {
    const total = widths.reduce((a, b) => a + b, 0);
    const border = o.noBorder ? 'nil' : 'single';
    const b = s => `<w:${s} w:val="${border}" w:sz="4" w:space="0" w:color="000000"/>`;
    let x = `<w:tbl><w:tblPr><w:tblW w:w="${total}" w:type="dxa"/>${o.center ? '<w:jc w:val="center"/>' : ''}<w:tblBorders>${b('top')}${b('left')}${b('bottom')}${b('right')}${b('insideH')}${b('insideV')}</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map(w => `<w:gridCol w:w="${w}"/>`).join('')}</w:tblGrid>`;
    rows.forEach((r, ri) => {
      x += `<w:tr>${ri === 0 && o.header ? '<w:trPr><w:tblHeader/><w:cantSplit/></w:trPr>' : '<w:trPr><w:cantSplit/></w:trPr>'}`;
      let col = 0;
      r.forEach(c => {
        const cell = typeof c === 'object' && c !== null && !Array.isArray(c) ? c : { p: c };
        const span = cell.span || 1;
        const w = widths.slice(col, col + span).reduce((a, b2) => a + b2, 0);
        col += span;
        let tcp = `<w:tcW w:w="${w}" w:type="dxa"/>`;
        if (span > 1) tcp += `<w:gridSpan w:val="${span}"/>`;
        if (cell.vMerge) tcp += `<w:vMerge${cell.vMerge === 'restart' ? ' w:val="restart"' : ''}/>`;
        if (cell.shade || (ri === 0 && o.header)) tcp += `<w:shd w:val="clear" w:color="auto" w:fill="${cell.shade || 'E7EDEA'}"/>`;
        tcp += `<w:vAlign w:val="${cell.vAlign || 'top'}"/>`;
        let content = cell.p;
        if (content == null || content === '') content = [para('', { after: 0 })];
        else if (typeof content === 'string') content = [para(content, { after: 0, jc: cell.jc, r: { b: cell.b || (ri === 0 && o.header) } })];
        x += `<w:tc><w:tcPr>${tcp}</w:tcPr>${content.join('')}</w:tc>`;
      });
      x += '</w:tr>';
    });
    return x + '</w:tbl>';
  }

  /* ---------- Gambar ---------- */
  const EMU = 914400;
  function imageRun(ctx, bytes, mime, pxW, pxH, maxWIn, maxHIn) {
    const ext = mime === 'image/png' ? 'png' : 'jpeg';
    const n = ++ctx.imgCount;
    const name = `image${n}.${ext}`;
    const rid = `rIdImg${n}`;
    ctx.media.push({ name, bytes, rid });
    let w = maxWIn, h = maxWIn * (pxH / pxW);
    if (h > maxHIn) { h = maxHIn; w = maxHIn * (pxW / pxH); }
    const cx = Math.round(w * EMU), cy = Math.round(h * EMU);
    const id = 100 + n;
    return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${id}" name="Gambar ${n}"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic><pic:nvPicPr><pic:cNvPr id="${id}" name="${name}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
  }

  /* ---------- Bahagian laporan ---------- */
  const W = 9746; // lebar kandungan (twip)
  const BODY = { line: 360, after: 160, jc: 'both' };

  function heading(text) { return para(run(text, { b: true }), { after: 160, before: 200, keepNext: true }); }
  function subheading(text) { return para(run(text, { b: true }), { after: 120, before: 120, keepNext: true }); }
  function numbered(num, text) {
    return para([run(`${num}\t`), run(text)], { ...BODY, tabs: [720], ind: { left: 720, hanging: 720 } });
  }
  function counter(n) { let c = 0; return () => `${n}.${++c}.`; }
  function numberedList(next, paras) { return paras.map(p => numbered(next(), p)); }
  function bodyParas(text) { return splitParas(text).map(p => para(p, BODY)); }

  function tindakanCell(k) {
    const t = k.tindakan || {};
    const T = window.TINDAKAN[t.jenis];
    if (!T) return [para('-', { after: 0 })];
    const out = [para(run(T.word, { b: true, u: true }), { after: 60 })];
    if (t.pemulihan && T.fields.includes('pemulihan')) out.push(para([run('Tindakan pemulihan - ', { b: true }), run(t.pemulihan)], { after: 60 }));
    if (T.fields.includes('tempoh') && ((t.tempohHari !== '' && t.tempohHari != null) || t.tarikhAkhir)) {
      const label = t.jenis === 'larangan' ? 'Tarikh akhir alih - ' : 'Tempoh pemulihan - ';
      const val = t.tempohHari === 0 || t.tempohHari === '0' ? 'Serta merta' : `${t.tempohHari ? t.tempohHari + ' hari ' : ''}${t.tarikhAkhir ? '(' + fmtDate(t.tarikhAkhir) + ')' : ''}`.trim();
      out.push(para([run(label, { b: true }), run(val)], { after: 60 }));
    }
    if (t.jenis === 'kompaun' && t.tarikhBayar) out.push(para([run('Tarikh akhir bayaran - ', { b: true }), run(fmtDate(t.tarikhBayar))], { after: 60 }));
    if (t.jenis === 'sitaan' && t.barang) out.push(para([run('Barang disita - ', { b: true }), run(t.barang)], { after: 60 }));
    return out;
  }

  function tindakanTable(kesalahan) {
    if (!kesalahan || !kesalahan.length) return '';
    const widths = [2000, 2850, 2450, 2446];
    const rows = [[
      { p: 'Nama Pelaku Kesalahan / Nama Premis', jc: 'center' },
      { p: 'Butiran Kesalahan', jc: 'center' },
      { p: 'Undang-undang Kecil Pihak Berkuasa Tempatan', jc: 'center' },
      { p: 'Tindakan', jc: 'center' }
    ]];
    // kumpul ikut premis supaya sel premis digabung (seperti contoh laporan)
    const groups = [];
    kesalahan.forEach(k => {
      const key = (k.premis || '').trim().toLowerCase();
      const g = groups.find(x => x.key === key && key);
      if (g) g.items.push(k); else groups.push({ key, name: k.premis || '-', items: [k] });
    });
    groups.forEach(g => g.items.forEach((k, i) => {
      rows.push([
        { p: i === 0 ? g.name : '', vMerge: g.items.length > 1 ? (i === 0 ? 'restart' : 'continue') : null, vAlign: 'center' },
        { p: k.butiran || '-' },
        { p: citeList(k) || '-' },
        { p: tindakanCell(k) }
      ]);
    }));
    return table(widths, rows, { header: true });
  }

  function infoTable(pairs) {
    const rows = pairs.filter(p => p[1] != null && p[1] !== '').map(([k, v]) => [
      { p: k, b: true },
      { p: Array.isArray(v) ? v.map((line, i) => para(`${i + 1}. ${line}`, { after: 40 })) : String(v) }
    ]);
    return rows.length ? table([2600, 7146], rows) : '';
  }

  function linesOf(text) { return String(text || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); }

  function sectionBody(s, n, ctx) {
    const out = [];
    const T = window.REPORT_TYPES[s.type];
    const f = s.fields || {};
    const nx = counter(n);
    switch (s.type) {
      case 'kosong': {
        out.push(heading(`${n}.0 ${T.label.toUpperCase()}`));
        out.push(infoTable([['LOKASI / PREMIS DIPERIKSA', linesOf(f.lokasi).length > 1 ? linesOf(f.lokasi) : f.lokasi]]));
        out.push(subheading('HASIL PEMERIKSAAN'));
        out.push(...bodyParas(window.TEMPLATES.kosongHasil));
        if (f.catatan) { out.push(subheading('CATATAN')); out.push(...bodyParas(f.catatan)); }
        break;
      }
      case 'premis': {
        out.push(heading(`${n}.0 ${T.label.toUpperCase()}`));
        out.push(infoTable([['PERKARA', f.perkara], ['LOKASI PEMERIKSAAN', linesOf(f.lokasi).length > 1 ? linesOf(f.lokasi) : f.lokasi]]));
        out.push(subheading('HASIL PEMERIKSAAN'));
        out.push(...numberedList(nx, splitParas(s.ai.hasil)));
        if ((s.kesalahan || []).length) { out.push(subheading('TINDAKAN PENGUATKUASA')); out.push(tindakanTable(s.kesalahan)); out.push(blank()); }
        break;
      }
      case 'permit': {
        out.push(heading(`${n}.0 ${T.label.toUpperCase()}`));
        out.push(infoTable([['PREMIS / LOKASI', linesOf(f.lokasi).length > 1 ? linesOf(f.lokasi) : f.lokasi], ['JENIS PERMIT', f.jenisPermit], ['STATUS', f.status]]));
        out.push(subheading('HASIL PEMERIKSAAN'));
        out.push(...numberedList(nx, splitParas(s.ai.hasil)));
        if ((s.kesalahan || []).length) { out.push(subheading('TINDAKAN PENGUATKUASA')); out.push(tindakanTable(s.kesalahan)); out.push(blank()); }
        break;
      }
      case 'kenderaan': {
        out.push(heading(`${n}.0 ${T.label.toUpperCase()}${f.lokasi ? ' - ' + f.lokasi.toUpperCase() : ''}`));
        out.push(...numberedList(nx, splitParas(s.ai.hasil)));
        const v = s.kenderaan || [];
        if (v.length) {
          out.push(subheading('Butiran kenderaan:'));
          out.push(table([800, 3600, 2346, 3000], [
            [{ p: 'BIL.', jc: 'center' }, { p: 'JENIS KENDERAAN', jc: 'center' }, { p: 'WARNA', jc: 'center' }, { p: 'NO. PENDAFTARAN', jc: 'center' }],
            ...v.map((k, i) => [{ p: String(i + 1), jc: 'center' }, { p: k.jenis || '-' }, { p: k.warna || '-' }, { p: k.noPlat || 'Tiada', jc: 'center' }])
          ], { header: true }));
          out.push(blank());
        }
        const t = s.tindakan || {};
        if (t.jenis) {
          const T2 = window.TINDAKAN[t.jenis];
          let line = `Tindakan: ${T2.label}`;
          if (t.tarikhAkhir) line += `, tarikh akhir ${fmtDate(t.tarikhAkhir)}`;
          line += `. Peruntukan: ${cite('K', '27(1)')}.`;
          out.push(para(line, BODY));
        }
        break;
      }
      case 'mesyuarat': {
        out.push(heading(`${n}.0 ${(f.jenis || 'Mesyuarat').toUpperCase()}${f.tajuk ? ': ' + f.tajuk.toUpperCase() : ''}`));
        if (f.tempat) out.push(para([run('Tempat: ', { b: true }), run(f.tempat)], BODY));
        out.push(...bodyParas(s.ai.hasil));
        break;
      }
      case 'aduan': {
        out.push(heading(`${n}.0 MAKLUMAT ADUAN`));
        out.push(infoTable([['Tajuk Aduan', f.tajuk], ['Pengadu', f.pengadu], ['No. Rujukan Surat', f.noRujukan], ['Tarikh Surat Aduan', fmtDate(f.tarikhSurat)], ['Lokasi Aduan', f.lokasiAduan]]));
        if (f.keterangan) { out.push(subheading('KETERANGAN BERKENAAN ADUAN')); out.push(...bodyParas(f.keterangan)); }
        out.push(subheading('HASIL PEMERIKSAAN ADUAN'));
        out.push(...numberedList(nx, splitParas(s.ai.hasil)));
        if (s.ai.kesimpulan || f.kesimpulan) {
          out.push(subheading('KESIMPULAN'));
          out.push(...bodyParas(s.ai.kesimpulan || `Aduan ini didapati ${String(f.kesimpulan).toUpperCase()}.`));
        }
        if ((s.kesalahan || []).length) { out.push(subheading('TINDAKAN PENGUATKUASA')); out.push(tindakanTable(s.kesalahan)); out.push(blank()); }
        break;
      }
      case 'susulan': {
        out.push(heading(`${n}.0 PEMERIKSAAN SUSULAN${f.tajuk ? ': ' + f.tajuk.toUpperCase() : ''}`));
        if (f.asal) { out.push(subheading('KETERANGAN PEMERIKSAAN ASAL')); out.push(...bodyParas(f.asal)); }
        out.push(infoTable([['Lokasi', f.lokasi], ['Tujuan', f.tujuan]]));
        out.push(subheading('HASIL PEMERIKSAAN SUSULAN'));
        out.push(...numberedList(nx, splitParas(s.ai.hasil)));
        if (s.ai.kesimpulan || f.status) { out.push(subheading('KESIMPULAN')); out.push(...bodyParas(s.ai.kesimpulan || `Pemilik didapati ${String(f.status).toUpperCase()} terhadap arahan yang dikeluarkan.`)); }
        if ((s.kesalahan || []).length) { out.push(subheading('TINDAKAN LANJUT')); out.push(tindakanTable(s.kesalahan)); out.push(blank()); }
        break;
      }
      case 'ppw': {
        out.push(heading(`${n}.0 KETERANGAN PEMANTAUAN HARIAN (PPW / IKLAN HARAM)`));
        out.push(...bodyParas(window.TEMPLATES.ppwKeterangan));
        out.push(subheading('HASIL PEMANTAUAN HARIAN'));
        out.push(...bodyParas(s.ai.hasil));
        out.push(subheading('PUNCA KUASA'));
        window.TEMPLATES.ppwPuncaKuasa.forEach(t => out.push(para(t, BODY)));
        break;
      }
      case 'bersepadu': {
        out.push(heading(`${n}.0 KETERANGAN OPERASI${f.tajuk ? ': ' + f.tajuk.toUpperCase() : ''}`));
        out.push(...numberedList(nx, splitParas(s.ai.keterangan)));
        (s.agensi || []).filter(a => a.nama).forEach(a => {
          out.push(subheading(a.nama));
          const ppl = linesOf(a.anggota).map(l => l.split(/\s*[,|-]\s*(?=[^,|-]*$)/));
          if (ppl.length) out.push(table([800, 4600, 4346], [[{ p: 'BIL.', jc: 'center' }, { p: 'NAMA', jc: 'center' }, { p: 'JAWATAN DAN GRED', jc: 'center' }],
            ...ppl.map((p, i) => [{ p: `${i + 1}.`, jc: 'center' }, { p: p[0] || '' }, { p: p[1] || '' }])], { header: true }));
          out.push(blank());
        });
        const lok = (s.lokasiOps || []).filter(l => l.nama);
        if (lok.length) {
          out.push(heading(`${n + 1}.0 HASIL OPERASI`));
          lok.forEach((l, i) => {
            out.push(subheading(`${n + 1}.${i + 1} ${l.nama.toUpperCase()}`));
            out.push(...bodyParas(l.naratif));
            if (l.tindakan) { out.push(para(run('Tindakan Yang Diambil', { b: true }), { after: 80 })); out.push(...bodyParas(l.tindakan)); }
          });
          ctx.extraHeadings += 1;
        }
        if (s.ai.rumusan) { out.push(subheading('RUMUSAN')); out.push(...bodyParas(s.ai.rumusan)); }
        break;
      }
      case 'sitaan': {
        out.push(heading(`${n}.0 LATAR BELAKANG`));
        out.push(...numberedList(nx, splitParas(s.ai.latarBelakang)));
        out.push(heading(`${n + 1}.0 PUNCA KUASA`));
        out.push(para('Anggota-anggota penguatkuasa menggunakan peruntukan perundangan seperti berikut untuk melaksanakan operasi sitaan iaitu:', BODY));
        window.TEMPLATES.sitaanPuncaKuasa.forEach(t => out.push(para(run(t, { i: true }), { ...BODY, ind: { left: 720, hanging: 0 } })));
        (s.kesalahan || []).forEach(k => out.push(para([run('Keterangan kesalahan: ', { b: true }), run(`${citeList(k)} - ${k.butiran || ''}`)], BODY)));
        out.push(heading(`${n + 2}.0 TINDAKAN`));
        out.push(...numberedList(counter(n + 2), splitParas(s.ai.kronologi)));
        const barang = linesOf(f.barang);
        if (barang.length) { out.push(para(run('Barang yang disita:', { b: true }), { after: 80 })); barang.forEach((b, i) => out.push(para(`${i + 1}. ${b}`, { after: 60, ind: { left: 720, hanging: 360 } }))); }
        if (f.noRepot) out.push(para([run('No. repot polis: ', { b: true }), run(`${f.noRepot}${f.tarikhRepot ? ' bertarikh ' + fmtDate(f.tarikhRepot) : ''}`)], BODY));
        if (f.stor) out.push(para([run('Stor sitaan: ', { b: true }), run(f.stor)], BODY));
        const luar = linesOf(f.agensiLuar).map(l => l.split(/\s*[,|-]\s*(?=[^,|-]*$)/));
        if (luar.length) {
          out.push(subheading(`AGENSI KERAJAAN${f.namaAgensi ? ': ' + f.namaAgensi.toUpperCase() : ''}`));
          out.push(table([800, 4600, 4346], [[{ p: 'BIL.', jc: 'center' }, { p: 'NAMA', jc: 'center' }, { p: 'JAWATAN', jc: 'center' }],
            ...luar.map((p, i) => [{ p: `${i + 1}.`, jc: 'center' }, { p: p[0] || '' }, { p: p[1] || '' }])], { header: true }));
          out.push(blank());
        }
        ctx.extraHeadings += 2;
        ctx.sk = true;
        break;
      }
    }
    return out.join('');
  }

  function reportTitle(r) {
    const types = [...new Set(r.sections.map(s => s.type))];
    const one = types.length === 1 ? types[0] : null;
    const s0 = r.sections[0] || {};
    const f = s0.fields || {};
    if (one === 'aduan') return 'LAPORAN PEMERIKSAAN ADUAN AWAM';
    if (one === 'susulan') return 'LAPORAN PEMERIKSAAN SUSULAN';
    if (one === 'bersepadu') return 'LAPORAN OPERASI BERSEPADU' + (f.tajuk ? ' ' + f.tajuk.toUpperCase() : '');
    if (one === 'sitaan') return 'LAPORAN OPERASI SITAAN' + (f.tajuk ? ' ' + f.tajuk.toUpperCase() : '');
    return 'LAPORAN PEMANTAUAN HARIAN PENGUATKUASA';
  }

  async function build(r, opt) {
    const ctx = { media: [], imgCount: 0, extraHeadings: 0, sk: false };
    const staffById = Object.fromEntries((opt.staff || []).map(s => [s.id, s]));
    let body = '';

    // Logo dan tajuk
    if (opt.logo) body += para(imageRun(ctx, opt.logo.bytes, opt.logo.mime, opt.logo.w, opt.logo.h, 0.85, 0.85), { jc: 'center', after: 120 });
    body += para(run('BAHAGIAN PENGUATKUASA', { b: true }), { jc: 'center', after: 0 });
    body += para(run('MAJLIS DAERAH SERIAN', { b: true }), { jc: 'center', after: 200 });
    body += para(run(reportTitle(r), { b: true, sz: 24 }), { jc: 'center', after: 240 });

    const tabs = [1300, 1600];
    body += para([run('Tarikh\t:\t'), run(`${fmtDate(r.tarikh)} (${dayName(r.tarikh)})`)], { tabs, after: 60 });
    body += para([run('Tempat\t:\t'), run(r.tempat || '-')], { tabs, after: 60, ind: { left: 1600, hanging: 1600 } });
    body += para([run('Masa\t:\t'), run(`${fmtTime(r.masaMula)} - ${fmtTime(r.masaTamat)} (${sesi(r.masaMula)})`)], { tabs, after: 240 });

    // Bahagian
    let n = 1;
    r.sections.forEach(s => {
      ctx.extraHeadings = 0;
      body += sectionBody(s, n, ctx);
      n += 1 + ctx.extraHeadings;
    });

    // Gambar
    const withPhotos = r.sections.filter(s => (s.photos || []).length);
    if (withPhotos.length) {
      body += heading(`${n}.0 GAMBAR PEMERIKSAAN`);
      let sub = 1;
      for (const s of withPhotos) {
        const T = window.REPORT_TYPES[s.type];
        const label = (s.fields && (s.fields.lokasi || s.fields.tajuk || s.fields.perkara)) || '';
        body += subheading(`${n}.${sub} ${T.label.toUpperCase()}${label ? ' - ' + String(label).split('\n')[0].toUpperCase() : ''}`);
        sub++;
        const cells = [];
        for (const ph of s.photos) {
          const img = opt.photos[ph.id];
          if (!img) continue;
          const pieces = [];
          if (ph.label) pieces.push(para(run(ph.label.toUpperCase(), { b: true }), { jc: 'center', after: 60 }));
          pieces.push(para(imageRun(ctx, img.bytes, img.mime, img.w, img.h, 3.0, 2.6), { jc: 'center', after: 60 }));
          if (ph.caption) pieces.push(para(run(ph.caption, { sz: 20 }), { jc: 'center', after: 0 }));
          cells.push(pieces);
        }
        const rows = [];
        for (let i = 0; i < cells.length; i += 2) rows.push([{ p: cells[i] }, { p: cells[i + 1] || '' }]);
        if (rows.length) { body += table([4873, 4873], rows); body += blank(); }
      }
      n++;
    }

    // Anggota terlibat
    const anggota = (r.anggota || []).map(id => staffById[id]).filter(Boolean);
    if (anggota.length) {
      const hasKekuatan = r.sections.some(s => s.type === 'sitaan' || s.type === 'bersepadu');
      body += heading(`${n}.0 ${hasKekuatan ? 'KEKUATAN ANGGOTA MAJLIS DAERAH SERIAN' : 'ANGGOTA TERLIBAT'}`);
      body += table([800, 4900, 4046], [
        [{ p: 'BIL.', jc: 'center' }, { p: 'NAMA ANGGOTA', jc: 'center' }, { p: 'JAWATAN DAN GRED', jc: 'center' }],
        ...anggota.map((a, i) => [{ p: `${i + 1}.`, jc: 'center' }, { p: a.nama }, { p: a.jawatan }])
      ], { header: true });
      body += blank();
    }

    // Penutup
    const peny = staffById[r.penyedia] || anggota[0] || { nama: '', jawatan: '' };
    body += para('Sekian, terima kasih.', { before: 240, after: 240, keepNext: true });
    body += para(run('Laporan disediakan oleh :', { b: true }), { after: 600, keepNext: true });
    body += para(run(`(${String(peny.nama).toUpperCase()})`, { b: true }), { after: 0, keepNext: true });
    body += para(peny.jawatan || '', { after: 0, keepNext: true });
    body += para('Majlis Daerah Serian', { after: 0, keepNext: true });
    body += para(`Tarikh : ${fmtDate(r.tarikh)}`, { after: 240 });

    if (ctx.sk) {
      const sk = window.TEMPLATES.sitaanSK;
      sk.forEach((t, i) => body += para([run(i === 0 ? 's.k.\t' : '\t', { b: true }), run(`(${i + 1}) ${t}`, { b: true })], { tabs: [720], after: 40 }));
    }

    const NS = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
    const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${NS}><w:body>${body}<w:sectPr><w:footerReference w:type="default" r:id="rIdFooter"/><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1440" w:right="1080" w:bottom="1440" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`;

    const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:eastAsia="Arial" w:cs="Arial"/><w:sz w:val="22"/><w:szCs w:val="22"/><w:lang w:val="ms-MY"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="0" w:line="240" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>`;

    const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="18"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;

    const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:defaultTabStop w:val="720"/><w:compat><w:compatSetting w:name="compatibilityMode" w:uri="http://schemas.microsoft.com/office/word" w:val="15"/></w:compat></w:settings>`;

    const docRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/><Relationship Id="rIdFooter" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>${ctx.media.map(m => `<Relationship Id="${m.rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${m.name}"/>`).join('')}</Relationships>`;

    const created = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${esc(reportTitle(r))}</dc:title><dc:creator>${esc(peny.nama)}</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${created}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${created}</dcterms:modified></cp:coreProperties>`;

    const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpeg" ContentType="image/jpeg"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`;

    const rootRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`;

    return zip([
      { name: '[Content_Types].xml', data: contentTypes },
      { name: '_rels/.rels', data: rootRels },
      { name: 'docProps/core.xml', data: coreXml },
      { name: 'word/document.xml', data: documentXml },
      { name: 'word/styles.xml', data: stylesXml },
      { name: 'word/settings.xml', data: settingsXml },
      { name: 'word/footer1.xml', data: footerXml },
      { name: 'word/_rels/document.xml.rels', data: docRels },
      ...ctx.media.map(m => ({ name: `word/media/${m.name}`, data: m.bytes }))
    ]);
  }

  window.WordGen = { build, fmtDate, fmtTime, dayName, sesi, cite, citeList, addDays, splitParas };
})();
