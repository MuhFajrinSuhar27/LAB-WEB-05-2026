export const PALET = [
  { bg: "#2d5a4b", fg: "#f3efe4", aksen: "#a9c4b5" }, 
  { bg: "#243b5a", fg: "#f1eee6", aksen: "#9db7d5" }, 
  { bg: "#2b2b2a", fg: "#f2efe8", aksen: "#bdb8aa" }, 
  { bg: "#b8c5b0", fg: "#1e2a22", aksen: "#4f6b58" }, 
  { bg: "#cbd8e6", fg: "#1d2b3d", aksen: "#5a7ca3" }, 
  { bg: "#d9d4c7", fg: "#222220", aksen: "#6f6a5c" }, 
  { bg: "#1f4e54", fg: "#efefe8", aksen: "#8fc1c4" }, 
  { bg: "#5b2a3a", fg: "#f3e9e6", aksen: "#c99aa8" }, 
];

export function seedDari(buku) {
  if (Number.isInteger(buku.id)) return buku.id;
  let s = 0;
  for (const c of buku.judul ?? "") s += c.charCodeAt(0);
  return s;
}

export function paletDari(buku) {
  return PALET[Math.abs(seedDari(buku)) % PALET.length];
}
