export default function StatusBuku({ tersedia, className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
        tersedia
          ? "border border-aksen/30 bg-aksen/10 text-aksen"
          : "border border-amber-600/30 bg-amber-50 text-amber-800"
      } ${className}`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        {tersedia && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aksen opacity-75 duration-1000" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            tersedia ? "bg-aksen" : "bg-amber-600"
          }`}
        />
      </span>
      <span>{tersedia ? "Tersedia" : "Dipinjam"}</span>
    </span>
  );
}
