import { Chain } from '@types';

const N = 5;

export const abbrAddress = (address: string, chain: Chain) => {
  let m = chain === 'vite' ? N + 5 : N + 2;
  let n = N;
  if (!m) {
    m = 4;
  }
  if (!n) {
    n = 4;
  }
  return `${address.slice(0, m)}....${address.slice(-n)}`;
};
