import { useState, useEffect } from 'react';
import { Txn } from '@types';
import * as request from '@utils/request';

const useTxn = (id: string) => {
  const [txn, setTxn] = useState<Txn | null>(null);

  useEffect(() => {
    const load = async () => {
      setTxn(await request.get(`/txns/${id}`));
    };
    load();
  }, []);

  return txn;
};

export default useTxn;
