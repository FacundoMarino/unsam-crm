import { Box, Divider, Drawer, List, Toolbar } from '@mui/material';
import { SideBarItem } from './SideBarItem';
import logo from '../../public/logo-auth-crm.png';
import { MdOutlineHomeRepairService } from 'react-icons/md';

export const Sidebar = ({ draweWidth }) => {
  const notes = [
    {
      id: 1,
      title: 'Services',
      icon: <MdOutlineHomeRepairService />,
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
            backgroundColor: '#343840',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '75%' }} />
          </div>
        </Toolbar>
        <Divider />

        <List
          sx={{
            backgroundColor: '#343840',
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
