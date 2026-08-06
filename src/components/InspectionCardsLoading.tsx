export default function InspectionCardsLoading() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-10">
        <div className="h-10 w-72 rounded-lg bg-slate-200"></div>

        <div className="mt-4 h-5 w-96 rounded-lg bg-slate-100"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-slate-200 bg-white p-6"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-200"></div>

            <div className="mt-6 h-5 w-40 rounded bg-slate-200"></div>

            <div className="mt-3 h-4 w-full rounded bg-slate-100"></div>

            <div className="mt-2 h-4 w-3/4 rounded bg-slate-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
