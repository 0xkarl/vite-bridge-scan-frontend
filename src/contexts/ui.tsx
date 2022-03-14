import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from 'react';
import NProgress from 'nprogress';

import { Network } from '@types';
import { VITE_BLOCK_EXPLORERS, BSC_BLOCK_EXPLORERS } from '@config';

const UIContext = createContext<{
  startProgress: () => void;
  endProgress: () => void;
  inProgress: boolean;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  network: string;
  setNetwork: (s: Network) => void;
  bscBaseBlockexplorerUrl: string;
  viteBaseBlockexplorerUrl: string;
} | null>(null);

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [network, setNetwork] = useState<Network>('testnet');

  const bscBaseBlockexplorerUrl = useMemo(() => BSC_BLOCK_EXPLORERS[network], [
    network,
  ]);
  const viteBaseBlockexplorerUrl = useMemo(
    () => VITE_BLOCK_EXPLORERS[network],
    [network]
  );

  const startProgress = useCallback(() => {
    setInProgress(true);
    NProgress.start();
    NProgress.set(0.4);
  }, [setInProgress]);

  const endProgress = useCallback(() => {
    setInProgress(false);
    NProgress.done();
  }, [setInProgress]);

  return (
    <UIContext.Provider
      value={{
        startProgress,
        endProgress,
        inProgress,
        searchTerm,
        setSearchTerm,
        network,
        setNetwork,
        bscBaseBlockexplorerUrl,
        viteBaseBlockexplorerUrl,
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
