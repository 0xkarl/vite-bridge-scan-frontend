import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Link, HashRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from '@pages/Landing';
import TxList from '@pages/TxList';
import TxDetail from '@pages/TxDetail';
import TestModal from '@modals/TestModal';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '1200px',
    margin: '0 auto',
    padding: '100px 0 30px',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      padding: '70px 0 10px',
      width: 'auto',
    },
    '& .MuiInputLabel-shrink': {
      right: 0,
      transform: 'translate(0, 1.5px) scale(1)',
      transformOrigin: 'top left',
      fontSize: 12,
    },
    '& td, th': {
      borderColor: 'transparent',
    },
  },
}));

const Layout: FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <Box className={classes.container}>
        <Switch>
          <Route exact path={'/'} component={Landing} />
          <Route path={'/txs'} component={TxList} />
          <Route path={'/tx/:id'} component={TxDetail} />
        </Switch>

        {/* modals */}
        <Switch>
          <Route path={'/test/:test'} component={TestModal} />
        </Switch>

        <div className='mt-8 flex justify-center'>
          build by&nbsp;
          <a
            href='https://voltlabs.io'
            target='_blank'
            rel='noreferrer noopener'
            className='underline'
          >
            voltlabs
          </a>
        </div>
      </Box>
    </Router>
  );
};

export default Layout;
