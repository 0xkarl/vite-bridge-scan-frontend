import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import { BORDER_RADIUS } from '@config';

export const useStyles = makeStyles((theme) => ({
  container: {
    width: 600,
    minHeight: 400,
  },
  synthBalanceTable: {
    borderRadius: BORDER_RADIUS,
    background: 'white',
  },
  synthBalanceTableHead: {
    background: '#E6E6E6',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
}));

const TestModal: FC<{
  match: { params: { test: string } };
  history: any;
}> = ({
  match: {
    params: { test },
  },
  history,
}) => {
  const classes = useStyles();

  const close = () => history.push('/network-overview/synth-holders');

  return (
    <Dialog open={true} onClose={() => {}}>
      <Box className={classes.container}>
        <Box
          px={4}
          my={2}
          className='flex flex-grow justify-space items-center'
        >
          <Typography variant='h5' className='flex'>
            <Box mr={1}>Test</Box>x
          </Typography>

          <CloseIcon className='cursor-pointer' onClick={close} />
        </Box>

        <Box>Test</Box>
      </Box>
    </Dialog>
  );
};

export default TestModal;
