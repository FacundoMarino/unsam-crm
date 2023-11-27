import {
  Alert,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import logo from '../../public/logo-auth.jpg';

import { AuthLayout } from '../layout/AuthLayout';

const startData = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  password: '',
};
export const RegisterPage = () => {
  const { email, password, nombre, apellido, telefono, inputHandler } =
    useForm(startData);

  const errorMessage = false;

  const isAuthenticating = 'checking';

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const googleSignInHandler = () => {};

  return (
    <AuthLayout title="Registro">
      <form
        onSubmit={submitHandler}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              mt: 3,
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt="" style={{ width: '75%' }} />
            <Typography variant="h5" style={{ color: 'grey' }}>
              Registrarse en Centro PyME
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              borderRadius: '5px',
              border: '2px solid #b5cebc',
              padding: '15px',
            }}
          >
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="Nombre"
                type="nombre"
                placeholder="Nombre"
                fullWidth
                name="nombre"
                value={nombre}
                onChange={inputHandler}
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="Apellido"
                type="apellido"
                placeholder="Apellido"
                fullWidth
                name="apellido"
                value={apellido}
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
                label="Telefono"
                type="telefono"
                placeohlder="Telefono"
                fullWidth
                name="telefono"
                value={telefono}
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

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid display={!!errorMessage ? '' : 'none'} item xs={12} sm={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Button
                  disabled={!isAuthenticating}
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: 'green', color: 'white' }}
                >
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link
                component={RouterLink}
                color="inherit"
                to="/auth/login"
                sx={{ mt: 2 }}
              >
                Login
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
