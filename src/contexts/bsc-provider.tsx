import React, {
  FC,
  useContext,
  createContext,
  ReactNode,
  useMemo,
} from 'react';
import { providers } from 'ethers';

import { BSC_WEB3_PROVIDER } from '@config';
import { useUI } from './ui';

const BSCProviderContext = createContext<{
  provider: providers.Provider;
} | null>(null);

export const BSCProviderProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { network } = useUI();

  const provider = useMemo(
    () => new providers.JsonRpcProvider(BSC_WEB3_PROVIDER[network]),
    [network]
  );

  return (
    <BSCProviderContext.Provider
      value={{
        provider,
      }}
    >
      {children}
    </BSCProviderContext.Provider>
  );
};

export function useBSCProvider() {
  const context = useContext(BSCProviderContext);
  if (!context) {
    throw new Error('Missing BSCProvider context');
  }
  return context;
}
