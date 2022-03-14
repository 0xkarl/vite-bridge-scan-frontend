import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { UIProvider } from '@contexts/ui';
import Layout from '@components/global/Layout';
import theme from '@utils/theme';

const App: FC = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <CssBaseline />
      <UIProvider>
        <Layout />
      </UIProvider>
    </ThemeProvider>
  );
};

export default App;
