import { Paper, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const Header = (props: any) => {
  const theme = useTheme();
  const { toggleColorMode } = props.colorMode;

  return (
    <Paper
      sx={{
        py: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
      elevation={0}
    >
      <Typography
        sx={{
          fontSize: 32,
          fontWeight: 'bold',
        }}
      >
        TransitTime
      </Typography>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Paper>
  );
};
