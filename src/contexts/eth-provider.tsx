import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useMemo,
} from 'react';
import { providers } from 'ethers';

import { ETH_WEB3_PROVIDER } from '@config';
import { useUI } from './ui';

const ETHProviderContext = createContext<{
  provider: providers.Provider;
} | null>(null);

export const ETHProviderProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { network } = useUI();

  const provider = useMemo(
    () => new providers.JsonRpcProvider(ETH_WEB3_PROVIDER[network]),
    [network]
  );

  return (
    <ETHProviderContext.Provider
      value={{
        provider,
      }}
    >
      {children}
    </ETHProviderContext.Provider>
  );
};

export function useETHProvider() {
  const context = useContext(ETHProviderContext);
  if (!context) {
    throw new Error('Missing ETHProvider context');
  }
  return context;
}
