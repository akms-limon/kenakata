export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="h-9 w-32 animate-pulse rounded bg-gray-200" />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
        <div className="h-12 animate-pulse rounded-lg bg-gray-200" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="aspect-square animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-4 h-4 w-20 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-5 animate-pulse rounded bg-gray-200" />

            <div className="mt-2 h-5 w-24 animate-pulse rounded bg-gray-200" />

            <div className="mt-4 h-10 animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}