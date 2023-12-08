import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../public/logo-auth.jpg';

import {
  Alert,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { login, selectAuthStatus } from '../../store/auth/authSlider';
import { startLoginWithEmailPassword } from '../../store/auth/thunks';

const startData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  // const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, inputHandler, formState } = useForm(startData);

  const dispatch = useDispatch();
  const errorMessage = false;

  const isAuthenticating = useSelector(selectAuthStatus);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Login">
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
            <img src={logo} alt="logo" style={{ width: '75%' }} />
            <Typography variant="h5" style={{ color: 'grey' }}>
              Ingresar a Centro PyME
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
                  Ingresar
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Link
                component={RouterLink}
                color="inherit"
                to="/auth/register"
                sx={{ mt: 2 }}
              >
                Crear Cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
