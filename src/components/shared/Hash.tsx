import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { Chain } from '@types';
import { useUI } from '@contexts/ui';
import CopyToClipboard from '@components/shared/CopyToClipboard';

const useStyles = makeStyles((theme) => ({
  container: {
    color: '#006fe9 !important',
  },
}));

const Hash: FC<{ hash: string; chain: Chain }> = ({ hash, chain }) => {
  const { viteBaseBlockexplorerUrl, bscBaseBlockexplorerUrl } = useUI();
  const classes = useStyles();

  const blockExplorerLink = useMemo(
    () =>
      (chain === 'vite'
        ? `${viteBaseBlockexplorerUrl}/tx/`
        : `${bscBaseBlockexplorerUrl}/tx/`) + hash,
    [hash, chain, viteBaseBlockexplorerUrl, bscBaseBlockexplorerUrl]
  );

  return !hash ? (
    <>-</>
  ) : (
    <CopyToClipboard text={hash}>
      <a
        href={blockExplorerLink}
        className={clsx('flex items-center', classes.container)}
        target='_blank'
        rel='noreferrer'
      >
        <Box mr={2}>{hash}</Box>
      </a>
    </CopyToClipboard>
  );
};

export default Hash;
