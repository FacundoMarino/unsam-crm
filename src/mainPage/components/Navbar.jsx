import { useDispatch } from 'react-redux';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { Grid, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = ({ draweWidth }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      color="banckgroundCrm"
      sx={{
        width: { sm: ` calc(100% - ${draweWidth}px)` },
        ml: { sm: `${draweWidth}px)` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="white"
          ></Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
