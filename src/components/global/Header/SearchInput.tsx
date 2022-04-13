import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { Box } from '@material-ui/core';
import clsx from 'clsx';

import { useUI } from '@contexts/ui';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    background: 'white',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.25)',
    height: 36,
  },
  largeRoot: {
    height: 48,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  disabled: {
    background: theme.palette.action.disabledBackground,
  },
}));

const SearchInput: FC<{ large?: boolean }> = ({ large }) => {
  const classes = useStyles();
  const { searchTerm, setSearchTerm } = useUI();
  const history = useHistory();

  return (
    <Paper
      component='form'
      className={clsx(classes.root, {
        [classes.disabled]: !!searchTerm,
        [classes.largeRoot]: large,
      })}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as any;
        const localSearchTerm = form.input.value as string;
        if (localSearchTerm) {
          if (localSearchTerm.length > 60) {
            // tx
            history.push(`/tx/${localSearchTerm}`);
          } else {
            setSearchTerm(localSearchTerm);
            history.push('/');
          }
        }
      }}
    >
      {searchTerm ? (
        <>
          <Box className='flex flex-grow' pl={2}>
            {searchTerm}
          </Box>

          <IconButton
            type='button'
            className={classes.iconButton}
            aria-label='clear'
            onClick={() => {
              setSearchTerm('');
            }}
          >
            <ClearIcon />
          </IconButton>
        </>
      ) : (
        <>
          <InputBase
            name='input'
            className={classes.input}
            placeholder='Search...'
            inputProps={{ 'aria-label': 'search' }}
            defaultValue={searchTerm}
          />
          <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default SearchInput;
