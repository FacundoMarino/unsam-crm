import { Grid, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../public/logo-auth.jpg';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectAuthStatus } from '../../store/auth/authSlider';

export const ValidateEmail = () => {
  const isAuthenticating = useSelector(selectAuthStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticating === 'validate') {
      setTimeout(() => {
        dispatch(login('validateEmail'));
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticating === 'validateEmail') {
      setTimeout(() => {
        dispatch(login('validateOk'));
      }, 3000);
    }
  }, [isAuthenticating]);

  return (
    <Grid
      container
      direction="colum"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '80vh', backgroundColor: 'backgroundCrm', p: 1 }}
    >
      <Grid
        item
        sx={{
          mt: 1,
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'start',
        }}
      >
        <img src={logo} alt="" style={{ width: '15%' }} />
      </Grid>

      {isAuthenticating === 'validateEmail' ? (
        <Grid
          item
          className=" animate__animated animate__fadeIn"
          xs={8}
          sx={{ width: { md: 650 }, padding: 3, borderRadius: 5 }}
        >
          <MarkEmailReadIcon style={{ width: '100%', height: '10rem' }} />
          <Typography
            variant="h5"
            style={{ color: 'grey', textAlign: 'center' }}
          >
            Muchas gracias por validar tu correo. Serás redirigido en los
            siguientes segundos.
          </Typography>
        </Grid>
      ) : (
        <Grid
          item
          className=" animate__animated animate__fadeIn"
          xs={8}
          sx={{ width: { md: 650 }, padding: 3, borderRadius: 5 }}
        >
          <EmailIcon style={{ width: '100%', height: '10rem' }} />
          <Typography
            variant="h5"
            style={{ color: 'grey', textAlign: 'center' }}
          >
            Hemos enviado un enlace de activación a tu dirección de correo
            electrónico. Por favor, verifica tu bandeja de entrada y sigue las
            instrucciones para activar tu cuenta.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
