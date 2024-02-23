import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { crearUsuario } from '../../../../store/users/thunks';

const startData = {
  link_meet: '',
  email: '',
  password: '',
  name: '',
  apellido: '',
  telephone: '',
  type_user: '',
  rol: '',
  sub_rol: '',
};
export const UsuarioModal = ({ open, handleClose }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();

  const {
    link_meet,
    email,
    password,
    type_user,
    name,
    apellido,
    telephone,
    rol,
    sub_rol,
    inputHandler,
    formState,
  } = useForm(startData);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(crearUsuario({ telekinesis, ...formState }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Nuevo Usuario</DialogTitle>
        <DialogContent>
          <form
            onSubmit={submitHandler}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <FormControl fullWidth margin="normal">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label="Nombre"
                    multiline
                    value={name}
                    placeholder="Nombre"
                    name="name"
                    onChange={inputHandler}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Apellido"
                    multiline
                    value={apellido}
                    name="apellido"
                    placeholder="Apellido"
                    onChange={inputHandler}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Telefono"
                    type="telefono"
                    placeohlder="Telefono"
                    fullWidth
                    name="telephone"
                    value={telephone}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Link Meet"
                    placeohlder="Link de meet"
                    fullWidth
                    name="link_meet"
                    value={link_meet}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Tipo de Usuario"
                    placeohlder="Tipo de Usuario"
                    fullWidth
                    name="type_user"
                    value={type_user}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Rol de Usuario"
                    placeohlder="Rol de Usuario"
                    fullWidth
                    name="rol"
                    value={rol}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Sub Rol de Usuario"
                    placeohlder="Sub Rol de Usuario"
                    fullWidth
                    name="sub_rol"
                    value={sub_rol}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Correo"
                    type="email"
                    placeholder="correo@google.com.ar"
                    fullWidth
                    name="email"
                    value={email}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    fullWidth
                    name="password"
                    value={password}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="primary"
                  >
                    Crear Usuario
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </DialogContent>
      </Container>
    </Dialog>
  );
};
