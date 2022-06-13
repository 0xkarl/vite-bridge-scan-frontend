import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from '@utils/theme';
import Layout from '@components/global/Layout';
import { ViteProvider } from '@react-vite';
import { UIProvider, useUI } from '@contexts/ui';
import { BSCProviderProvider } from '@contexts/bsc-provider';
import { ETHProviderProvider } from '@contexts/eth-provider';

const App: FC = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <CssBaseline />
      <UIProvider>
        <Shell />
      </UIProvider>
    </ThemeProvider>
  );
};

const Shell: FC = () => {
  const { network } = useUI();
  return (
    <ViteProvider {...{ network }}>
      <BSCProviderProvider>
        <ETHProviderProvider>
          <Layout />
        </ETHProviderProvider>
      </BSCProviderProvider>
    </ViteProvider>
  );
};

export default App;
