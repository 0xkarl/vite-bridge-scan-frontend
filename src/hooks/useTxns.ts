import { useState, useEffect, useMemo } from 'react';
import { Txn } from '@types';
import * as request from '@utils/request';
import { useUI } from '@contexts/ui';

const COUNT = 10;

const useTxns = () => {
  const [txns, setTxns] = useState<Txn[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { searchTerm } = useUI();

  const pages = useMemo(() => Math.ceil(totalCount / COUNT), [totalCount]);

  useEffect(() => {
    const load = async () => {
      const { totalCount, data } = await request.get('/txns', {
        page: page - 1,
        count: COUNT,
        ...(searchTerm ? { address: searchTerm } : null),
      });
      setTxns(data);
      setTotalCount(totalCount);
    };
    load();
  }, [page, searchTerm]);

  return {
    txns,
    page,
    pages,
    setPage,
  };
};

export default useTxns;
