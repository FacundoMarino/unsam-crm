/*import {
  Alert,
  Grid,
  TextField,
  Typography,
  Button,
  Link,
} from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Nombre Completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={inputHandler}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com.ar"
                fullWidth
                name="email"
                value={email}
                onChange={inputHandler}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
              <Grid display={!!errorMessage ? '' : 'none'} item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={12}>
                <Button
                  disabled={isCheckingAuthentication}
                  type="submit"
                  variant="contained"
                  fullWidth
                >
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction="row" justifyContent="end">
              <Typography sx={{ mr: 1, mt: 2 }}>¿Ya tienes cuenta?</Typography>
              <Link
                component={RouterLink}
                color="inherit"
                to="/auth/login"
                sx={{ mt: 2 }}
              >
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
*/
