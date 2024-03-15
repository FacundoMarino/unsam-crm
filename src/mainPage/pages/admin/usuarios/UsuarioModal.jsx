import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { crearUsuario, editarUsuario } from '../../../../store/users/thunks';
import { useEffect, useState } from 'react';

export const UsuarioModal = ({ open, handleClose, user }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    link_meet: '',
    email: '',
    password: '',
    name: '',
    apellido: '',
    telephone: '',
    type_user: '',
    rol: '',
    sub_rol: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const {
    link_meet,
    email,
    password,
    type_user,
    name,
    apellido,
    telephone,
    rol,
    inputHandler,
    formState,
  } = useForm(formData);

  const submitHandler = (event) => {
    if (user) {
      event.preventDefault();
      dispatch(editarUsuario({ telekinesis, ...formState }));
      handleClose();
    } else {
      event.preventDefault();
      dispatch(crearUsuario({ telekinesis, ...formState }));
      handleClose();
    }
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
                    label={name ? '' : 'Nombre'}
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
                    id="outlined-basic"
                    label={apellido ? '' : 'Apellido'}
                    multiline
                    value={apellido}
                    name="apellido"
                    placeholder={apellido ? '' : 'Apellido'}
                    onChange={inputHandler}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label={telephone ? '' : 'Telefono'}
                    type="telefono"
                    placeohlder={telephone ? '' : 'Telefono'}
                    fullWidth
                    name="telephone"
                    value={telephone}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label={link_meet ? '' : 'Link de meet'}
                    placeohlder={link_meet ? '' : 'Link de meet'}
                    fullWidth
                    name="link_meet"
                    value={link_meet}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="rol">
                      {rol ? '' : 'Rol de Usuario'}
                    </InputLabel>

                    <Select
                      labelId="rol"
                      fullWidth
                      name="rol"
                      value={rol || ''}
                      onChange={inputHandler}
                    >
                      <MenuItem value={1}>Admin</MenuItem>
                      <MenuItem value={2}>Admisión</MenuItem>
                      <MenuItem value={3}>Consultor</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label={email ? '' : 'Email'}
                    type="email"
                    placeholder={email ? '' : 'Email'}
                    fullWidth
                    name="email"
                    value={email}
                    onChange={inputHandler}
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextField
                    label={password ? '' : 'Contraseña'}
                    type="password"
                    placeholder={password ? '' : 'Contraseña'}
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
                    style={{ backgroundColor: '#6A51e1' }}
                  >
                    {user ? 'Editar Usuario' : 'Crear Usuario'}
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
