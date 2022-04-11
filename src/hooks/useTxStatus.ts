import { useState, useEffect } from 'react';

import { useViteProvider } from '@react-vite';
import { useBSCProvider } from '@contexts/bsc-provider';
import { Chain } from '@types';
import { poll } from '@utils/hooks';

const useTxStatus = (chain: Chain | null, hash: string | null) => {
  const { provider: viteProvider } = useViteProvider();
  const { provider: bscProvider } = useBSCProvider();
  const [ret, setRet] = useState<{
    confirmations: number;
    maxConfirmations: number;
  } | null>(null);

  useEffect(() => {
    return poll(async (isMounted) => {
      let confirmations = 0;
      let maxConfirmations: number | null = null;

      if (chain && hash) {
        if (chain === 'vite') {
          const x = await viteProvider.request(
            'ledger_getAccountBlockByHash',
            hash
          );
          if (x) {
            confirmations = Number(x.confirmations);
            maxConfirmations = 100;
          }
        } else {
          const x = await bscProvider.getTransaction(hash);
          if (x) {
            confirmations = Number(x.confirmations);
            maxConfirmations = 10;
          }
        }
      }

      if (isMounted && confirmations && maxConfirmations) {
        setRet({ confirmations, maxConfirmations });
      }

      return confirmations && maxConfirmations
        ? confirmations >= maxConfirmations
        : false;
    });
  }, [chain, hash, viteProvider, bscProvider]);

  return ret;
};

export default useTxStatus;
