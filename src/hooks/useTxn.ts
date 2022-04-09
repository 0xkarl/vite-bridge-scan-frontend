import { useState, useEffect } from 'react';

import { Txn } from '@types';
import * as request from '@utils/request';
import { poll } from '@utils/hooks';

const useTxn = (id: string) => {
  const [txn, setTxn] = useState<Txn | null>(null);

  useEffect(() => {
    return poll(async (isMounted) => {
      const txns = await request.get(`/txns/${id}`);
      if (isMounted) {
        setTxn(txns);
      }
    });
  }, [id]);

  return txn;
};

export default useTxn;
