import { createTheme } from '@material-ui/core/styles';
import { BORDER_RADIUS } from '@config';

export default createTheme({
  typography: {
    fontFamily: ['Metropolis', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
  palette: {
    background: {
      default: '#fff',
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
        border: '1px solid rgba(0, 0, 0, 0.15)',
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
