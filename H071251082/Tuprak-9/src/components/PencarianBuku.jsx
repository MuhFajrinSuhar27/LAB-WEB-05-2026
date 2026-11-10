"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function PencarianBuku({ initialQuery = "", kategori = "" }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  function navigate(newQuery) {
    const q = newQuery.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (kategori) params.set("kategori", kategori);

    const qs = params.toString();
    const target = qs ? `/katalog?${qs}` : "/katalog";

    startTransition(() => {
      router.replace(target, { scroll: false });
    });
  }

  function handleChange(e) {
    const nextVal = e.target.value;
    setQuery(nextVal);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      navigate(nextVal);
    }, 300);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    navigate(query);
  }

  function handleClear() {
    setQuery("");
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    navigate("");
    inputRef.current?.focus();
  }

  function handleKeyDown(e) {
    if (e.key === "Escape" && query) {
      e.preventDefault();
      handleClear();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="group relative flex w-full items-center rounded-full border border-line/70 bg-paper/60 px-3 py-1 transition-all duration-200 hover:border-line hover:bg-paper/90 focus-within:border-aksen focus-within:bg-white focus-within:shadow-[0_2px_14px_-2px_rgba(45,90,75,0.12)]"
      aria-label="Pencarian buku"
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-paper-deep/70 text-muted transition-colors group-focus-within:bg-aksen/10 group-focus-within:text-aksen"
        aria-hidden="true"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>

      <input
        ref={inputRef}
        type="search"
        id="q"
        name="q"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Cari judul, penulis, tahun..."
        autoComplete="off"
        spellCheck={false}
        className="w-full border-0 bg-transparent px-2.5 py-1 text-sm sm:text-base text-ink placeholder:text-muted/60 outline-none"
      />

      <div className="flex shrink-0 items-center gap-1.5">
        {isPending && (
          <span
            className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-line border-t-aksen"
            aria-label="Sedang mencari..."
            title="Mencari..."
          />
        )}

        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="flex h-6 w-6 items-center justify-center rounded-full text-muted transition-colors hover:bg-paper-deep hover:text-ink focus-visible:outline-none"
            aria-label="Hapus teks pencarian"
            title="Hapus pencarian (Esc)"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="submit"
          className="rounded-full bg-ink px-3 py-1 text-xs font-medium text-paper transition-all hover:bg-aksen active:scale-95"
          title="Terapkan pencarian"
        >
          Cari
        </button>
      </div>
    </form>
  );
}
