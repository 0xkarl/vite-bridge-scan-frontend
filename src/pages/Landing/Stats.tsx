import React, { FC, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock as timeIcon } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

const Stats: FC<{}> = () => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.container, 'grid grid-cols-3 gap-4 flex-grow')}
    >
      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div>
          <FontAwesomeIcon icon={timeIcon} /> Daily Volume
        </div>
      </div>

      <div className='border rounded shadow-sm flex flex-col p-8'>
        {' '}
        <div>
          <FontAwesomeIcon icon={timeIcon} /> Total Transactions
        </div>
      </div>

      <div className='border rounded shadow-sm flex flex-col p-8'>
        <div>
          <FontAwesomeIcon icon={timeIcon} /> Total Addresses
        </div>
      </div>
    </div>
  );
};

export default Stats;
