export default function Hero({ nama, slogan, lokasi, jamBuka }) {
  return (
    <section className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-fuchsia-900 text-white">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
        <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          {nama}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-indigo-100">{slogan}</p>
        <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <div>
            <dt className="text-indigo-300">Lokasi</dt>
            <dd className="font-medium">{lokasi}</dd>
          </div>
          <div>
            <dt className="text-indigo-300">Jam buka</dt>
            <dd className="font-medium">{jamBuka}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
