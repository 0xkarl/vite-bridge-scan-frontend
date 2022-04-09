export function poll(load: (isMounted: boolean) => void) {
  let isMounted = true;
  const unsubs = [
    () => {
      isMounted = false;
    },
  ];

  const id = setInterval(() => load(isMounted), 2_000);
  unsubs.push(() => {
    clearInterval(id);
  });

  load(isMounted);

  return () => unsubs.forEach((unsub) => unsub());
}
