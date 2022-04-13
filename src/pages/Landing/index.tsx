import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import SearchInput from '@components/shared/SearchInput';
import { useUI } from '@contexts/ui';
import Stats from './Stats';
import LatestTxList from './LatestTxList';
import Header from '@components/global/Header';

const useStyles = makeStyles((theme) => {
  return {
    container: {},
  };
});

const Landing: FC<{}> = () => {
  const classes = useStyles();
  const { clearSearch } = useUI();

  useEffect(() => {
    clearSearch();
  }, [clearSearch]);

  return (
    <>
      <Header mini />
      <div className={classes.container}>
        <div className='flex justify-center mb-12'>
          <Typography variant='h4'>
            <span className='font-bold'>The Vite Bridge Explorer</span>
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
    </>
  );
};

export default Landing;
