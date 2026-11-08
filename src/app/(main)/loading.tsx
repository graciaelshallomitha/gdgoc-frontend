export default function Loading() {
  return (
    <div aria-busy="true" className="mx-auto max-w-[1440px] animate-pulse px-5 py-24 sm:px-8 lg:px-24">
      <span className="sr-only">Loading…</span>
      <div className="h-5 w-48 rounded bg-surface" />
      <div className="mt-6 h-16 w-3/4 rounded bg-surface" />
      <div className="mt-4 h-16 w-1/2 rounded bg-surface" />
    </div>
  );
}