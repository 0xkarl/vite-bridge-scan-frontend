const N = 5;

export const abbrAddress = (address: string) => {
  const m =
    N + (~address.search(/^vite_/) ? 5 : ~address.search(/^0x/) ? 2 : 0);
  const n = N;
  return `${address.slice(0, m)}....${address.slice(-n)}`;
};
