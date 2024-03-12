import { Box, Toolbar } from '@mui/material';
import { Navbar, Sidebar } from '../components';

const draweWidth = '14%';

export const CrmLayout = ({ children }) => {
  return (
    <Box
      sx={{ display: 'flex' }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Navbar draweWidth={draweWidth} />

      <Sidebar draweWidth={draweWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};
