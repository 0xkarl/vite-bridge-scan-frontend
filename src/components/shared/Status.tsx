import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle as completeIcon,
  faClock as pendingIcon,
} from '@fortawesome/free-solid-svg-icons';
import { BORDER_RADIUS } from '@config';

const useStyles = makeStyles((theme) => {
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

const Status: FC<{ complete?: boolean }> = ({ complete }) => {
  const classes = useStyles();

  return (
    <Box
      className={clsx(
        classes.container,
        'flex-inline items-center cursor-pointer',
        {
          [classes.complete]: complete,
          [classes.pending]: !complete,
        }
      )}
    >
      <FontAwesomeIcon icon={complete ? completeIcon : pendingIcon} />
      <Box ml={0.5}>{complete ? 'complete' : 'in progress'}</Box>
    </Box>
  );
};

export default Status;
