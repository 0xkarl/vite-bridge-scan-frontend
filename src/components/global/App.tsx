import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from '@utils/theme';
import Layout from '@components/global/Layout';
import { ViteProvider } from '@react-vite';
import { UIProvider, useUI } from '@contexts/ui';
import { BSCProviderProvider } from '@contexts/bsc-provider';

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
        <Layout />
      </BSCProviderProvider>
    </ViteProvider>
  );
};

export default App;
