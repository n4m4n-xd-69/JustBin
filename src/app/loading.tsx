export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-20">
      <div
        className="size-10 animate-spin rounded-full border-2 border-border border-t-brand-green"
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
