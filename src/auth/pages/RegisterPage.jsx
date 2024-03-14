import {
  Alert,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
  Select,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import logo from '../../public/logo-auth.jpg';

import { AuthLayout } from '../layout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAuthStatus,
  selectErrorMessage,
} from '../../store/auth/authSlider';
import {
  getRegisterThunk,
  startRegister,
  startRegisterStepTwo,
} from '../../store/auth/thunks';
import { useEffect, useState } from 'react';

const startData = {
  cuit: '',
  direccion: '',
  descripcion: '',
  empleados: '',
  sucursales: '',
  selectedRubro: '',
  email: '',
  password: '',
  nombre: '',
  apellido: '',
  telefono: '',
  razon_social: '',
};
export const RegisterPage = () => {
  const {
    cuit,
    direccion,
    descripcion,
    empleados,
    sucursales,
    rubro,
    email,
    password,
    nombre,
    apellido,
    telefono,
    razon_social,
    inputHandler,
    formState,
  } = useForm(startData);

  const errorMessage = useSelector(selectErrorMessage);
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(selectAuthStatus);
  const user = useSelector((state) => state.auth);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    if (errorMessage != null) {
      setLoginError(errorMessage);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (isAuthenticating !== 'registerTwo') {
      dispatch(getRegisterThunk());
    }
  }, [dispatch]);

  const submitHandler = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('browser_token');

    let telekinesis = user.telekinesis;
    if (isAuthenticating !== 'registerTwo') {
      dispatch(startRegister(formState));
    } else if (isAuthenticating === 'registerTwo') {
      dispatch(
        startRegisterStepTwo({
          ...formState,

          telekinesis,
          token,
        }),
      );
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={submitHandler}
        className="animate__animated animate__fadeIn animate__faster"
      >
        {isAuthenticating === 'registerTwo' ? (
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
                  label="Cuit"
                  type="cuit"
                  placeholder="Cuit"
                  fullWidth
                  name="cuit"
                  value={cuit}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  label="Razón Social"
                  type="text"
                  placeholder="Razón Social"
                  fullWidth
                  name="razon_social"
                  value={razon_social}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  label="Descripción"
                  type="descripcion"
                  placeholder="Descripcion"
                  fullWidth
                  name="descripcion"
                  value={descripcion}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  label="Empleados"
                  type="empleados"
                  placeholder="Empleados"
                  fullWidth
                  name="empleados"
                  value={empleados}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  label="Sucursales"
                  type="number"
                  placeohlder="Sucursales"
                  fullWidth
                  name="sucursales"
                  value={sucursales}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                  label="Dirección"
                  type="direccion"
                  placeholder="Direccion"
                  fullWidth
                  name="direccion"
                  value={direccion}
                  onChange={inputHandler}
                />
              </Grid>

              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <Grid display={!!loginError ? '' : 'none'} item xs={12} sm={12}>
                  <Alert severity="error">{loginError}</Alert>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    disabled={!isAuthenticating}
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ color: 'white', backgroundColor: '#6A51e1' }}
                  >
                    Guardar Datos
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
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
                <Grid
                  display={!!errorMessage ? '' : 'none'}
                  item
                  xs={12}
                  sm={12}
                >
                  <Alert severity="error">{errorMessage}</Alert>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Button
                    disabled={!isAuthenticating}
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ color: 'white', backgroundColor: '#6A51e1' }}
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
        )}
      </form>
    </AuthLayout>
  );
};
