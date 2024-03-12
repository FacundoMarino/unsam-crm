import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
  palette: {
    banckgroundLogin: {
      main: '#ffffff',
    },
    banckgroundCrm: {
      main: '#6A51e1',
    },
    hover: {
      main: '#6A36D9',
    },
    fontColor: {
      main: '#DDB4FF',
    },
    error: {
      main: red.A400,
    },
  },
});
