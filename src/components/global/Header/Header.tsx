import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import SearchInput from '@components/shared/SearchInput';
import NetworkSwitcher from './NetworkSwitcher';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: 'none',
    background: '#fff',
  },
  toolbar: {
    alignItems: 'flex-start !important',
  },
}));

const Header: FC<{ mini?: boolean }> = ({ mini }) => {
  const classes = useStyles();

  return (
    <AppBar
      position='fixed'
      color='inherit'
      className={clsx(classes.container)}
    >
      <Toolbar color='inherit' className={clsx(classes.toolbar, 'pt-4')}>
        {mini ? (
          <div className='flex-grow' />
        ) : (
          <>
            <Link to='/' className='flex'>
              <img src='/vite.svg' alt='logo' height={30} width={30} />{' '}
              <Typography variant='h6'>ViteBridgeScan</Typography>
            </Link>
            <div className='flex-grow' />
            <SearchInput />
          </>
        )}

        <NetworkSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
