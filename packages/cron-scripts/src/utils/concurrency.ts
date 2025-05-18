/**
 * Simple utility to map an array of items with a
 * concurrency limit. Avoids extra dependencies (e.g. p-map)
 * to keep the project lightweight.
 */
export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  if (concurrency <= 0) {
    throw new Error('Concurrency must be greater than 0');
  }

  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  // Worker function that processes items until none remain
  async function worker() {
    while (true) {
      const currentIndex = nextIndex++;
      if (currentIndex >= items.length) break;

      const item = items[currentIndex];
      if (item === undefined) continue;

      try {
        results[currentIndex] = await mapper(item, currentIndex);
      } catch (error) {
        // Propagate the error but keep its position in results for debugging
        // You could choose to `throw` here to stop all workers, but it's often
        // useful to collect errors and continue.
        // @ts-expect-error – we intentionally allow `Error` in array for now.
        results[currentIndex] = error;
      }
    }
  }

  // Launch the workers (at most `concurrency` or items.length)
  const workerCount = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return results;
}
