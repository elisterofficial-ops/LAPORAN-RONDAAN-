/* Simpanan dalam telefon (IndexedDB) */
(function () {
  'use strict';
  const NAME = 'laporan-rondaan';
  const VERSION = 1;
  let dbp = null;

  function open() {
    if (dbp) return dbp;
    dbp = new Promise((resolve, reject) => {
      const req = indexedDB.open(NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('reports')) db.createObjectStore('reports', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('photos')) db.createObjectStore('photos', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('files')) db.createObjectStore('files', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv', { keyPath: 'k' });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbp;
  }
  async function tx(store, mode, fn) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const t = db.transaction(store, mode);
      const s = t.objectStore(store);
      let result;
      Promise.resolve(fn(s)).then(r => { result = r; });
      t.oncomplete = () => resolve(result);
      t.onerror = () => reject(t.error);
      t.onabort = () => reject(t.error);
    });
  }
  const reqP = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

  const DB = {
    get: (store, key) => tx(store, 'readonly', s => reqP(s.get(key))),
    put: (store, val) => tx(store, 'readwrite', s => reqP(s.put(val))),
    del: (store, key) => tx(store, 'readwrite', s => reqP(s.delete(key))),
    all: (store) => tx(store, 'readonly', s => reqP(s.getAll())),
    async kv(k, fallback) { const r = await DB.get('kv', k); return r ? r.v : fallback; },
    setKv: (k, v) => DB.put('kv', { k, v })
  };
  window.DB = DB;
})();
