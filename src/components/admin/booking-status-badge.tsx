export function BookingStatusBadge({ status }: { status: string }) {
  const styles = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    CONFIRMED:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    COLLECTED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status as keyof typeof styles] || styles.PENDING
      }`}
    >
      {status}
    </span>
  );
}
