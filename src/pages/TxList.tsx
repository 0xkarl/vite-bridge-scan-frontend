import React, { FC, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { LoaderIcon } from 'react-hot-toast';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as completeIcon,
  faClock as pendingIcon,
} from '@fortawesome/free-solid-svg-icons';

import { BORDER_RADIUS } from '@config';
import { Txn } from '@types';
import { formatUnits } from '@utils/big-number';
import useTxns from '@hooks/useTxns';
import Address from '@components/shared/Address';
import useTxStatus from '@hooks/useTxStatus';
import Header from '@components/global/Header';

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
    <>
      <Header />

      <Paper className={classes.container} elevation={0}>
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
                    <TxRow key={txn.id} {...{ txn }} />
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
      </Paper>
    </>
  );
};

const TxRow: FC<{ txn: Txn }> = ({ txn }) => {
  const inputTxCompleted = useTxStatus(txn.input);
  const outputTxCompleted = useTxStatus(txn.output);

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <Address chain={txn.input.chain} address={txn.from} reversed />
      </TableCell>
      <TableCell>
        <Address chain={txn.output.chain} address={txn.to} reversed />
      </TableCell>
      <TableCell>{txn.token}</TableCell>
      <TableCell>{formatUnits(txn.input.amount, 18, 2)}</TableCell>
      <TableCell>
        <Status input={inputTxCompleted} output={outputTxCompleted} />
      </TableCell>
      <TableCell>{moment.unix(txn.input.timestamp).fromNow()}</TableCell>
      <TableCell>{formatUnits(txn.fee, 18, 2)}</TableCell>
      <TableCell align='right'>
        <Link to={`/tx/${txn.id}`}>
          <Button
            variant='outlined'
            disableElevation
            color='primary'
            size='small'
          >
            view
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

const useStatusStyles = makeStyles((theme) => {
  return {
    container: {
      padding: '0rem 0.5rem',
      borderRadius: BORDER_RADIUS,
    },
    complete: {
      color: '#00c9a7',
      backgroundColor: 'rgba(0,201,167, 0.1)',
    },
    pending: {
      color: '#c09853',
      backgroundColor: '#fcf8e3',
    },
  };
});

type O = {
  confirmations?: number;
  maxConfirmations?: number;
};

const Status: FC<{
  input: O | null;
  output: O | null;
}> = ({ input, output }) => {
  const classes = useStatusStyles();
  const complete = useMemo(
    () =>
      !(
        input?.confirmations &&
        input?.maxConfirmations &&
        output?.confirmations &&
        output?.maxConfirmations
      )
        ? null
        : input.confirmations >= input.maxConfirmations &&
          output.confirmations >= output.maxConfirmations,
    [input, output]
  );

  return complete === null ? (
    <LoaderIcon />
  ) : (
    <Box
      className={clsx(
        classes.container,
        'inline-flex items-center cursor-pointer',
        {
          [classes.complete]: complete,
          [classes.pending]: !complete,
        }
      )}
    >
      <FontAwesomeIcon icon={complete ? completeIcon : pendingIcon} />
      <Box ml={0.5}>{complete ? 'complete' : `in progress`}</Box>
    </Box>
  );
};

export default TransactionsList;
