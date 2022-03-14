export type Network = 'mainnet' | 'testnet';

export type Token = 'vite' | 'usdv';

export type Chain = 'bsc' | 'vite';

export type Txn = {
  id: string;
  from: string;
  to: string;
  token: Token;
  input: {
    timestamp: number;
    amount: string;
    hash: string;
    chain: Chain;
  };
  output: {
    timestamp?: number;
    amount?: string;
    hash?: string;
    chain: Chain;
  };
};
