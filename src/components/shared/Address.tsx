import React, { FC, useMemo } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { Chain } from '@types';
import { abbrAddress } from '@utils/string';
import { useUI } from '@contexts/ui';
import CopyToClipboard from '@components/shared/CopyToClipboard';

const useStyles = makeStyles((theme) => ({
  container: {
    color: '#006fe9 !important',
  },
}));

const Address: FC<{
  address: string | null;
  chain: Chain;
  reversed?: boolean;
}> = ({ address, chain, reversed }) => {
  const { viteBaseBlockexplorerUrl, bscBaseBlockexplorerUrl } = useUI();
  const classes = useStyles();

  const formatedAddress = useMemo(() => {
    return !address ? null : abbrAddress(address, chain);
  }, [chain, address]);

  const blockExplorerLink = useMemo(
    () =>
      (chain === 'vite'
        ? `${viteBaseBlockexplorerUrl}/account/`
        : `${bscBaseBlockexplorerUrl}/address/`) + address,
    [address, chain, viteBaseBlockexplorerUrl, bscBaseBlockexplorerUrl]
  );

  return !address ? (
    <>-</>
  ) : (
    <CopyToClipboard text={address}>
      <a
        href={blockExplorerLink}
        className={clsx('flex items-center', classes.container, {
          'flex-row-reverse': reversed,
          'justify-end': reversed,
        })}
        target='_blank'
        rel='noreferrer'
      >
        <Box {...(reversed ? { ml: 2 } : { mr: 2 })}>{formatedAddress}</Box>
        <img
          src={chain === 'vite' ? '/vite.svg' : '/bsc.svg'}
          alt={`${address} - ${chain}`}
          width={14}
          height={14}
        />
      </a>
    </CopyToClipboard>
  );
};

export default Address;
