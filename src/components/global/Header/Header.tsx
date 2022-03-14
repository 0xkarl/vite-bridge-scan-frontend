import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import NetworkSwitcher from './NetworkSwitcher';

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: 'none',
    background: '#DCDCDC',
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position='fixed' color='inherit' className={classes.container}>
      <Toolbar color='inherit'>
        <Link to='/' className='flex flex-grow'>
          <Typography variant='h6'>ViteBridge Scan</Typography>
        </Link>

        <SearchInput />

        <NetworkSwitcher />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
