export function poll(
  load: (isMounted: boolean) => Promise<boolean>,
  ms?: number
) {
  let isMounted = true;
  const unsubs = [
    () => {
      isMounted = false;
    },
  ];

  let cleared = false;
  const id = setInterval(async () => {
    const unsubscribe = await load(isMounted);
    if (unsubscribe) {
      if (!cleared) {
        clearInterval(id);
      }
      cleared = true;
    }
  }, ms || 2_000);
  unsubs.push(() => {
    if (!cleared) {
      clearInterval(id);
    }
  });

  load(isMounted);

  return () => unsubs.forEach((unsub) => unsub());
}
