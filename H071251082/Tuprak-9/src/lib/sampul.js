import "server-only";


const cache = globalThis.__sampulCache ?? (globalThis.__sampulCache = new Map());
const TTL_ADA = 7 * 24 * 60 * 60 * 1000;
const TTL_TIDAK = 10 * 60 * 1000;

function norm(s) {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SAMPUL_TERVERIFIKASI = {
  "laskar pelangi": {
    kecil: ["https://covers.openlibrary.org/b/id/7079796-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/7079796-L.jpg", "https://covers.openlibrary.org/b/id/7079796-M.jpg"],
  },
  "bumi manusia": {
    kecil: ["https://covers.openlibrary.org/b/id/6643692-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/6643692-L.jpg", "https://covers.openlibrary.org/b/id/6643692-M.jpg"],
  },
  "laut bercerita": {
    kecil: ["https://covers.openlibrary.org/b/id/10648285-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/10648285-L.jpg", "https://covers.openlibrary.org/b/id/10648285-M.jpg"],
  },
  "pulang": {
    kecil: ["https://covers.openlibrary.org/b/id/12905869-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/12905869-L.jpg", "https://covers.openlibrary.org/b/id/12905869-M.jpg"],
  },
  "filosofi teras": {
    kecil: ["https://covers.openlibrary.org/b/id/15255806-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/15255806-L.jpg", "https://covers.openlibrary.org/b/id/15255806-M.jpg"],
  },
  "atomic habits": {
    kecil: ["https://covers.openlibrary.org/b/id/12539702-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/12539702-L.jpg", "https://covers.openlibrary.org/b/id/12539702-M.jpg"],
  },
  "sapiens": {
    kecil: ["https://covers.openlibrary.org/b/id/8634250-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/8634250-L.jpg", "https://covers.openlibrary.org/b/id/8634250-M.jpg"],
  },
  "negeri 5 menara": {
    kecil: ["https://covers.openlibrary.org/b/id/14303993-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/14303993-L.jpg", "https://covers.openlibrary.org/b/id/14303993-M.jpg"],
  },
  "cantik itu luka": {
    kecil: ["https://covers.openlibrary.org/b/id/13903116-M.jpg"],
    besar: ["https://covers.openlibrary.org/b/id/13903116-L.jpg", "https://covers.openlibrary.org/b/id/13903116-M.jpg"],
  },
};

function denganZoom(url, n) {
  return /zoom=\d/.test(url) ? url.replace(/zoom=\d/, `zoom=${n}`) : url;
}

async function dariOpenLibrary(judul, penulis) {
  const url =
    "https://openlibrary.org/search.json?q=" +
    encodeURIComponent(`${judul} ${penulis}`) +
    "&limit=5&fields=cover_i,title";

  const res = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    next: { revalidate: 604800 },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const doc = (data.docs ?? []).find((d) => d.cover_i);
  if (!doc) return null;

  const m = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg?default=false`;
  const l = `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`;
  return { kecil: [m], besar: [l, m] };
}

async function dariGoogleBooks(judul, penulis) {
  const q = `intitle:"${judul}" inauthor:"${penulis}"`;
  const url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    encodeURIComponent(q) +
    "&maxResults=10&printType=books&fields=items(volumeInfo(title,imageLinks))";

  const res = await fetch(url, {
    signal: AbortSignal.timeout(5000),
    next: { revalidate: 604800 },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const target = norm(judul);

  for (const item of data.items ?? []) {
    const info = item.volumeInfo;
    const link = info?.imageLinks?.thumbnail ?? info?.imageLinks?.smallThumbnail;
    if (!link) continue;
    if (!norm(info.title).includes(target)) continue;

    const dasar = link.replace(/^http:/, "https:").replace("&edge=curl", "");
    return {
      kecil: [denganZoom(dasar, 2), denganZoom(dasar, 1)],
      besar: [denganZoom(dasar, 3), denganZoom(dasar, 2), denganZoom(dasar, 1)],
    };
  }
  return null;
}

async function cari(judul, penulis) {
  const kunci = norm(judul);
  if (SAMPUL_TERVERIFIKASI[kunci]) {
    return SAMPUL_TERVERIFIKASI[kunci];
  }

  for (const sumber of [dariOpenLibrary, dariGoogleBooks]) {
    try {
      const hasil = await sumber(judul, penulis);
      if (hasil) return hasil;
    } catch {
    }
  }
  return null;
}

export function getSampul(judul, penulis) {
  const kunci = `${norm(judul)}|${norm(penulis)}`;
  const tersimpan = cache.get(kunci);
  if (tersimpan && tersimpan.kedaluwarsa > Date.now()) return tersimpan.janji;

  const janji = cari(judul, penulis);
  const entri = { janji, kedaluwarsa: Date.now() + TTL_TIDAK };
  cache.set(kunci, entri);
  janji.then((h) => {
    if (h) entri.kedaluwarsa = Date.now() + TTL_ADA;
  });
  return janji;
}

export async function denganSampul(daftar) {
  return Promise.all(
    daftar.map(async (b) => ({ ...b, sampul: await getSampul(b.judul, b.penulis) }))
  );
}
