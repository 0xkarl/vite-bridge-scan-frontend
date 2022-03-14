import { createTheme } from '@material-ui/core/styles';
import { BORDER_RADIUS } from '@config';

export default createTheme({
  typography: {
    fontFamily: [
      'Work Sans',
      'Arial',
      'sans-serif',
      // 'Metropolis',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // 'Segoe UI',
      // 'Roboto',
      // 'Oxygen',
      // 'Helvetica Neue',
      // 'sans-serif',
    ].join(','),
  },
  palette: {
    background: {
      default: '#e5e5e554',
      paper: '#fff',
    },
    primary: {
      main: '#006fe9',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.5)', // rgb(9, 9, 47)
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: BORDER_RADIUS,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: BORDER_RADIUS,
      },
    },
    MuiDialog: {
      paper: {
        borderRadius: BORDER_RADIUS,
      },
    },
    // MuiInput: {
    //   underline: {
    //     '&:before': {
    //       borderBottomColor: '#313131',
    //     },
    //     '&:after': {
    //       borderBottomColor: '#313131',
    //     },
    //   },
    // },
  },
});
