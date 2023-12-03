import { TurnedInNot } from '@mui/icons-material';
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useDispatch } from 'react-redux';

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const newTitle = '';

  const activeNoteHandler = () => {};

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={activeNoteHandler}>
        <ListItemIcon></ListItemIcon>
        <TurnedInNot />
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
