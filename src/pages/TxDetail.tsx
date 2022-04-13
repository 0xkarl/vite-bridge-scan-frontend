import React, { FC, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as completeIcon,
  faClock as pendingIcon,
} from '@fortawesome/free-solid-svg-icons';

import { BORDER_RADIUS } from '@config';
import useTxn from '@hooks/useTxn';
import { formatUnits } from '@utils/big-number';
import Address from '@components/shared/Address';
import Hash from '@components/shared/Hash';
import DateComponent from '@components/shared/Date';
import useTxStatus from '@hooks/useTxStatus';
import Header from '@components/global/Header';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
    heading: {
      fontSize: 18,
      margin: 0,
      padding: 0,
    },
    summary: {
      display: 'grid',
      gridTemplateColumns: '100px 1fr',
      padding: '20px 30px',
      lineHeight: '1.5rem',
      fontWeight: 'bold',
    },
    detail: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      padding: '20px 40px',
      lineHeight: '1.5rem',
    },
    unknown: {
      padding: '20px 30px',
      lineHeight: '1.5rem',
    },
  };
});

const TxDetail: FC<{ match: { params: { id: string } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const classes = useStyles();
  const txn = useTxn(id);
  const inputTxCompleted = useTxStatus(txn?.input.chain, txn?.input.hash);
  const outputTxCompleted = useTxStatus(txn?.output.chain, txn?.output.hash);

  return (
    <>
      <Header />

      {txn === undefined ? null : (
        <Box className={classes.container}>
          <h4 className={classes.heading}>Transaction Details</h4>

          {txn === null ? (
            <Box mt={2}>
              <Paper className={classes.unknown} elevation={0}>
                Unknown bridge transaction: {id}
              </Paper>
            </Box>
          ) : (
            <>
              <Box mt={2}>
                <Paper className={classes.summary} elevation={0}>
                  <div>Token:</div>
                  <div>{txn.token}</div>

                  <div>Amount:</div>
                  <div>{formatUnits(txn.input.amount, 18, 2)}</div>
                </Paper>
              </Box>

              <Box mt={2}>
                <Paper className={classes.detail} elevation={0}>
                  <div>From:</div>
                  <div>
                    <Address chain={txn.input.chain} address={txn.from} />
                  </div>

                  <div>From Hash:</div>
                  <div>
                    <Hash hash={txn.input.hash} chain={txn.input.chain} />
                  </div>

                  <div>Status:</div>
                  <div>
                    <Status {...inputTxCompleted} />
                  </div>

                  <div>Age:</div>
                  <div>
                    <DateComponent timestamp={txn.input.timestamp} />
                  </div>

                  {/*
          <div>Type:</div>
          <div>Lock</div>
          */}
                </Paper>
              </Box>

              <Box mt={2}>
                <Paper className={classes.detail} elevation={0}>
                  <div>To:</div>
                  <div>
                    <Address chain={txn.output.chain} address={txn.to} />
                  </div>

                  <div>To Hash:</div>
                  <div>
                    <Hash hash={txn.output.hash} chain={txn.output.chain} />
                  </div>

                  <div>Status:</div>
                  <div>
                    <Status {...outputTxCompleted} />
                  </div>

                  <div>Age:</div>
                  <div>
                    <DateComponent timestamp={txn.output.timestamp} />
                  </div>

                  {/*
          <div>Type:</div>
          <div>Lock</div>
          */}
                </Paper>
              </Box>
            </>
          )}
        </Box>
      )}
    </>
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

const Status: FC<{
  confirmations?: number;
  maxConfirmations?: number;
}> = ({ confirmations, maxConfirmations }) => {
  const classes = useStatusStyles();
  const complete = useMemo(
    () =>
      !(confirmations && maxConfirmations)
        ? null
        : confirmations >= maxConfirmations,
    [confirmations, maxConfirmations]
  );

  return complete === null ? (
    <>-</>
  ) : (
    <Box
      className={clsx(classes.container, 'flex items-center cursor-pointer', {
        [classes.complete]: complete,
        [classes.pending]: !complete,
      })}
    >
      <FontAwesomeIcon icon={complete ? completeIcon : pendingIcon} />
      <Box ml={0.5}>
        {complete
          ? 'complete'
          : `in progress (${confirmations}/${maxConfirmations})`}
      </Box>
    </Box>
  );
};

export default TxDetail;
