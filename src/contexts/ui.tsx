import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
} from 'react';

import { Network, Token } from '@types';
import {
  VITE_BLOCK_EXPLORERS,
  BSC_BLOCK_EXPLORERS,
  ETH_BLOCK_EXPLORERS,
} from '@config';

const UIContext = createContext<{
  searchParams: SearchParams;
  search: (s: SearchParams) => void;

  network: string;
  setNetwork: (s: Network) => void;

  clearSearch: () => void;

  bscBaseBlockexplorerUrl: string;
  viteBaseBlockexplorerUrl: string;
  ethBaseBlockexplorerUrl: string;
} | null>(null);

type SearchParams = {
  from?: string;
  to?: string;
  token?: Token;
  address?: string;
  fromHash?: string;
  toHash?: string;
};

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [searchParams, search] = useState<SearchParams>({});
  const [network, setNetwork] = useState<Network>('testnet');

  const bscBaseBlockexplorerUrl = useMemo(() => BSC_BLOCK_EXPLORERS[network], [
    network,
  ]);
  const viteBaseBlockexplorerUrl = useMemo(
    () => VITE_BLOCK_EXPLORERS[network],
    [network]
  );
  const ethBaseBlockexplorerUrl = useMemo(() => ETH_BLOCK_EXPLORERS[network], [
    network,
  ]);

  const clearSearch = useCallback(() => {
    search({});
  }, []);

  return (
    <UIContext.Provider
      value={{
        clearSearch,

        searchParams,
        search,

        network,
        setNetwork,

        bscBaseBlockexplorerUrl,
        viteBaseBlockexplorerUrl,
        ethBaseBlockexplorerUrl,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('Missing UI context');
  }
  return context;
}
