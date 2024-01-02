import {
  AppBar,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const forms = [
  {
    id: 1,
    form_type: 'Formulario 1',
  },
  {
    id: 2,
    form_type: 'Formulario 2',
  },
  {
    id: 3,
    form_type: 'Formulario 3',
  },
];

export const FormularioGestion = () => {
  const handleEditar = (id) => {};

  const handleCloseModal = () => {};

  const handleEliminar = (id) => {};

  const handleNuevoTurno = () => {};
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Formularios
          </Typography>
          <Button
            color="inherit"
            onClick={handleNuevoTurno}
            startIcon={<AddIcon />}
          >
            Nuevo Formulario
          </Button>
        </Toolbar>
      </AppBar>

      <List>
        {forms?.map((turno) => (
          <ListItem key={turno.form_type}>
            <ListItemText primary={turno.form_type} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditar(turno.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleEliminar(turno.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
