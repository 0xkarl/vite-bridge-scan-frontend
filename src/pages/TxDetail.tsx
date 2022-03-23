import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import useTxn from '@hooks/useTxn';
import { formatUnits } from '@utils/big-number';
import Address from '@components/shared/Address';
import Hash from '@components/shared/Hash';
import Status from '@components/shared/Status';
import DateComponent from '@components/shared/Date';

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
  };
});

const TxDetail: FC<{ match: { params: { id: string } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const classes = useStyles();
  const txn = useTxn(id);

  return !txn ? null : (
    <Box className={classes.container}>
      <h4 className={classes.heading}>Transaction Details</h4>

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
            <Status complete />
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
            <Status complete={txn.output.timestamp} />
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
    </Box>
  );
};

export default TxDetail;
