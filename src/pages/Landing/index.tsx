import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import SearchInput from '@components/global/Header/SearchInput';
import { useUI } from '@contexts/ui';
import Stats from './Stats';
import LatestTxList from './LatestTxList';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

const Landing: FC<{}> = () => {
  const classes = useStyles();
  const { setSearchTerm } = useUI();

  useEffect(() => {
    setSearchTerm('');
  }, [setSearchTerm]);

  return (
    <div className={classes.container}>
      <div className='flex justify-center mb-12'>
        <Typography variant='h4'>
          The Vite
          <>-</>
          BSC Bridge Explorer
        </Typography>
      </div>

      <div className='my-8 flex justify-center'>
        <SearchInput large />
      </div>

      <div className='my-8 flex flex-grow'>
        <Stats />
      </div>

      <LatestTxList />
    </div>
  );
};

export default Landing;
