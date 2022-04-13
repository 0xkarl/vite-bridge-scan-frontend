import { useState, useEffect, useMemo } from 'react';

import { Txn } from '@types/';
import * as request from '@utils/request';
import { useUI } from '@contexts/ui';
import { poll } from '@utils/hooks';

const COUNT = 20;

const useTxns = () => {
  const [txns, setTxns] = useState<Txn[] | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { searchParams } = useUI();

  const pages = useMemo(() => Math.ceil(totalCount / COUNT), [totalCount]);

  useEffect(() => {
    return poll(async (isMounted) => {
      const opts: Record<string, any> = {
        page: page - 1,
        count: COUNT,
        ...searchParams,
      };
      const { totalCount, data } = await request.get('/txns', opts);
      if (isMounted) {
        setTxns(data);
        setTotalCount(totalCount);
      }
      return false;
    });
  }, [page, searchParams]);

  return {
    txns,
    page,
    pages,
    setPage,
  };
};

export default useTxns;
