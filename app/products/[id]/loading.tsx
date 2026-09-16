function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="h-[500px] animate-pulse rounded-2xl bg-gray-200" />

          <div className="mt-4 flex gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 w-20 shrink-0 animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

          <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-gray-200" />

          <div className="mt-5 h-9 w-28 animate-pulse rounded bg-gray-200" />

          <div className="my-6 h-px bg-gray-200" />

          <div className="space-y-3">
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="mt-8 h-12 animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </main>
  );
}

export default Loading;