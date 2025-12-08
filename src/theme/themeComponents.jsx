import { red } from '@mui/material/colors';
import theme from './theme';

const themeComponents = (theme) => ({
  MuiFormLabel: {
    styleOverrides: {
        root: {
          fontSize: '12px',
          marginLeft: '3px',
          marginRight: '3px',
        },
      asterisk: {
        color: theme.colors.red.dark,
        marginLeft: '3px',
        fontSize: '12px',
      },
    },
  },
  
  // Add other component overrides here as needed
});

export default themeComponents;
