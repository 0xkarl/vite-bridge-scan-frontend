import React, { FC, useState, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import {
  Box,
  Button,
  TextField,
  Dialog,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from '@material-ui/core';
import clsx from 'clsx';

import { Token } from '@types';
import { abbrAddress } from '@utils/string';
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
  formRow: {
    margin: '0.5rem 0',
  },
  dialogContainer: { width: 650 },
}));

const TOKENS: Token[] = ['vite', 'usdv'];

const SearchInput: FC<{ large?: boolean }> = ({ large }) => {
  const classes = useStyles();
  const { clearSearch, search, searchParams } = useUI();
  const history = useHistory();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [localToken, setLocalToken] = useState<Token>('');

  const { from, to, token, address, fromHash, toHash } = searchParams;

  const isSearching = useMemo(
    () => !!(address || from || to || token || fromHash || toHash),
    [address, from, to, token, fromHash, toHash]
  );
  return (
    <>
      <div className='flex flex-col'>
        <Paper
          component='form'
          className={clsx(classes.root, {
            [classes.disabled]: isSearching,
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
                search({ address: localSearchTerm });
                history.push('/txs');
              }
            }
          }}
        >
          {isSearching ? (
            <>
              <Box className='flex flex-grow' pl={2}>
                {!address ? null : (
                  <span className='mx-1'>{abbrAddress(address)}</span>
                )}
                {!from ? null : (
                  <span className='mx-1'>
                    from:
                    {abbrAddress(from)}
                  </span>
                )}
                {!to ? null : (
                  <span className='mx-1'>
                    to:
                    {abbrAddress(to)}
                  </span>
                )}
                {!token ? null : <span className='mx-1'>token:{token} </span>}
                {!fromHash ? null : (
                  <span className='mx-1'>
                    from hash:
                    {abbrAddress(fromHash)}
                  </span>
                )}
                {!toHash ? null : (
                  <span className='mx-1'>
                    to hash:
                    {abbrAddress(toHash)}
                  </span>
                )}
              </Box>

              <IconButton
                type='button'
                className={classes.iconButton}
                aria-label='clear'
                onClick={() => {
                  clearSearch();
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
                placeholder='Search addresses, tx hash, etc...'
                inputProps={{ 'aria-label': 'search' }}
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
        <span
          className='text-xs mt-2 text-primary cursor-pointer'
          onClick={() => setShowAdvancedSearch(true)}
        >
          Advanced Search
        </span>
      </div>

      <Dialog
        open={!!showAdvancedSearch}
        onClose={() => {
          clearSearch();
          setShowAdvancedSearch(false);
        }}
      >
        <form
          className={clsx(classes.dialogContainer, 'p-4')}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as any;

            const from = form.from.value as string;
            const to = form.to.value as string;
            const token = form.token.value;
            const fromHash = form.fromHash.value as string;
            const toHash = form.toHash.value as string;

            search({ from, to, token, fromHash, toHash });
            history.push('/txs');
            setShowAdvancedSearch(false);
          }}
        >
          <div className='flex flex-grow justify-space items-center my-2'>
            <div className='flex text-xl mr-1 flex-grow'>Advanced Search</div>
            <CloseIcon
              className='cursor-pointer'
              onClick={() => {
                clearSearch();
                setShowAdvancedSearch(false);
              }}
            />
          </div>

          <div className='flex flex-col'>
            <div className={classes.formRow}>
              <TextField
                name='from'
                fullWidth
                label={'From'}
                placeholder={'Enter address...'}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formRow}>
              <TextField
                name='to'
                fullWidth
                label={'To'}
                placeholder={'Enter address...'}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formRow}>
              <FormControl fullWidth>
                <InputLabel id='tokenLabel'>Token</InputLabel>
                <Select
                  name='token'
                  labelId='tokenLabel'
                  id='tokenSelect'
                  value={localToken}
                  onChange={(event) =>
                    setLocalToken(event.target.value as string)
                  }
                >
                  {TOKENS.map((token) => (
                    <MenuItem value={token} key={token}>
                      {token}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={classes.formRow}>
              <TextField
                name='fromHash'
                fullWidth
                label={'From hash'}
                placeholder={'Enter hashs...'}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formRow}>
              <TextField
                name='toHash'
                fullWidth
                label={'To hash'}
                placeholder={'Enter hash...'}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>

            <div className={classes.formRow}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                size='small'
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default SearchInput;
