import { Paper, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const Header = (props: any) => {
  const theme = useTheme();

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
      <IconButton
        sx={{ ml: 1 }}
        onClick={props.colorMode}
        color="inherit"
        aria-label="Set Light/Dark Mode"
      >
        {theme.palette.mode === 'dark' ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Paper>
  );
};
