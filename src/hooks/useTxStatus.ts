import { useState, useEffect } from 'react';

import { useViteProvider } from '@react-vite';
import { useBSCProvider } from '@contexts/bsc-provider';
import { useETHProvider } from '@contexts/eth-provider';
import { Chain } from '@types';
import { poll } from '@utils/hooks';
import { MAX_VITE_CONFIRMATIONS, MAX_BSC_CONFIRMATIONS } from '@config';

type Args = {
  chain: Chain;
  hash: string | null;
  confirmed?: boolean;
};

const useTxStatus = (args: Args | null) => {
  const { provider: viteProvider } = useViteProvider();
  const { provider: bscProvider } = useBSCProvider();
  const { provider: ethProvider } = useETHProvider();
  const [ret, setRet] = useState<{
    confirmations: number;
    maxConfirmations: number;
  } | null>(null);

  useEffect(() => {
    return poll(async (isMounted) => {
      let confirmations = 0;
      let maxConfirmations = 0;

      if (args) {
        const { chain, hash, confirmed } = args;

        maxConfirmations =
          chain === 'vite' ? MAX_VITE_CONFIRMATIONS : MAX_BSC_CONFIRMATIONS;

        if (confirmed) {
          confirmations = maxConfirmations;
        } else {
          if (chain && hash) {
            switch (chain) {
              case 'vite': {
                const x = await viteProvider.request(
                  'ledger_getAccountBlockByHash',
                  hash
                );
                if (x) {
                  confirmations = Number(x.confirmations);
                }
                break;
              }
              case 'bsc': {
                const x = await bscProvider.getTransaction(hash);
                if (x) {
                  confirmations = Number(x.confirmations);
                }
                break;
              }
              case 'eth': {
                const x = await ethProvider.getTransaction(hash);
                if (x) {
                  confirmations = Number(x.confirmations);
                }
                break;
              }
              default:
                throw new Error(`unknown chain(${chain})`);
            }
          }
        }

        if (isMounted && confirmations && maxConfirmations) {
          setRet({ confirmations, maxConfirmations });
        }
      }

      return confirmations && maxConfirmations
        ? confirmations >= maxConfirmations
        : false;
    });
  }, [args, viteProvider, bscProvider, ethProvider]);

  return ret;
};

export default useTxStatus;
