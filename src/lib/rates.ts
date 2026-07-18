import { prisma } from "@/lib/prisma";
import { RATE_CATEGORIES, type RateCategory } from "@/lib/data";

const RATES_TTL_MS = 60 * 60 * 1000; // 1 hour

let cached: { data: RateCategory[]; at: number } | null = null;

/**
 * Scrap rates come from the database (seeded via `npm run db:seed`).
 * If the database is unreachable — e.g. a first local run without Postgres —
 * fall back to the same data the seed script uses so the UI never breaks.
 *
 * Results are memoized in-process for an hour: pages render dynamically
 * (the layout reads the session), so without this every request would
 * re-query — or, with no DB configured, hang for the connection timeout.
 */
export async function getRates(): Promise<RateCategory[]> {
  if (cached && Date.now() - cached.at < RATES_TTL_MS) return cached.data;

  let data = RATE_CATEGORIES;
  try {
    const categories = await prisma.scrapCategory.findMany({
      orderBy: { sortOrder: "asc" },
      include: { items: { orderBy: { sortOrder: "asc" } } },
    });
    if (categories.length > 0) data = categories;
  } catch {
    // fall through to static data
  }

  cached = { data, at: Date.now() };
  return data;
}

/** A representative item from each category, for the homepage preview strip. */
export async function getRatePreview() {
  const categories = await getRates();
  return categories.flatMap((category) =>
    category.items.slice(0, 1).map((item) => ({
      category: category.name,
      ...item,
    }))
  );
}
