import { PaletteMode } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'dark' && {
      // palette values for dark mode
      divider: blueGrey[900],
      background: {
        default: blueGrey[900],
        paper: blueGrey[900],
      },
    }),
  },
});
