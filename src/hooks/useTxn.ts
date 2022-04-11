import { useState, useEffect } from 'react';

import { Txn } from '@types';
import * as request from '@utils/request';
import { poll } from '@utils/hooks';

const useTxn = (id: string) => {
  // undefined - not loaded
  // null - loaded but 404
  const [txn, setTxn] = useState<Txn | null | undefined>(undefined);

  useEffect(() => {
    return poll(async (isMounted) => {
      try {
        const txns = await request.get(`/txns/${id}`);
        if (isMounted) {
          setTxn(txns);
        }
      } catch (e) {
        console.warn(e);
        if (isMounted) {
          setTxn(null);
        }
      }
      return false;
    });
  }, [id]);

  return txn;
};

export default useTxn;
