import { Box, Drawer, List, Toolbar } from '@mui/material';
import { SideBarItem } from './SideBarItem';
import logo from '../../public/logo-auth.jpg';
import { FaBars } from 'react-icons/fa';

export const Sidebar = ({ draweWidth }) => {
  const notes = [
    {
      id: 1,
      title: 'Menú Principal',
      icon: <FaBars />,
    },
  ];
  return (
    <Box
      component="nav"
      sx={{ width: { sm: draweWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: draweWidth },
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '75%' }} />
          </div>
        </Toolbar>
        <Toolbar
          sx={{
            backgroundColor: '#6A51e1',
          }}
        ></Toolbar>

        <List
          sx={{
            backgroundColor: '#6A51e1',
            height: '100vh',
          }}
        >
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
