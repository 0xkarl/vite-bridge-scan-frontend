import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';

import { BORDER_RADIUS } from '@config';
import { formatUnits, formatNumber } from '@utils/big-number';
import useTxns from '@hooks/useTxns';
import Address from '@components/shared/Address';
import Status from '@components/shared/Status';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
    table: {
      borderRadius: BORDER_RADIUS,
      background: 'white',
      minHeight: 100,
    },
    tableHead: {
      background: '#E6E6E6',
      borderTopLeftRadius: BORDER_RADIUS,
      borderTopRightRadius: BORDER_RADIUS,

      '& th:first-child': {
        borderTopLeftRadius: BORDER_RADIUS,
      },

      '& th:last-child': {
        borderTopRightRadius: BORDER_RADIUS,
      },
    },
  };
});

const TransactionsList: FC<{}> = () => {
  const classes = useStyles();
  const { txns, page, pages, setPage } = useTxns();

  return (
    <Box className={classes.container}>
      <Box className={classes.table}>
        {!txns ? (
          <Box p={4} className='flex justify-center'>
            Loading...
          </Box>
        ) : !txns.length ? (
          <Box p={4} className='flex justify-center'>
            No txns found
          </Box>
        ) : (
          <>
            <Table aria-label='tx list' size={'small'}>
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell>From</TableCell>
                  <TableCell>To</TableCell>
                  <TableCell>Token</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Fees</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txns.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell component='th' scope='row'>
                      <Address
                        chain={txn.input.chain}
                        address={txn.from}
                        reversed
                      />
                    </TableCell>
                    <TableCell>
                      <Address
                        chain={txn.output.chain}
                        address={txn.to}
                        reversed
                      />
                    </TableCell>
                    <TableCell>{txn.token}</TableCell>
                    <TableCell>
                      {formatUnits(txn.input.amount, 18, 2)}
                    </TableCell>
                    <TableCell>
                      <Status complete={txn.output.timestamp} />
                    </TableCell>
                    <TableCell>
                      {moment.unix(txn.input.timestamp).fromNow()}
                    </TableCell>
                    <TableCell>{formatNumber(txn.fee, 2)}</TableCell>
                    <TableCell align='right'>
                      <Link to={`/tx/${txn.id}`}>
                        <Button variant='outlined'>view</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Box mt={2} pb={2} className='flex justify-center'>
              <Pagination
                variant='outlined'
                shape='rounded'
                count={pages}
                page={page}
                onChange={(event: any, page: number) => setPage(page)}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TransactionsList;
