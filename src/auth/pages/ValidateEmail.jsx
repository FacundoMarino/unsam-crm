import { Button, Grid, TextField, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../../public/logo-auth.jpg';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerStepThree,
  selectAuthStatus,
} from '../../store/auth/authSlider';
import { useForm } from '../../hooks/useForm';
import { reciveEmailCode, sendEmailCode } from '../../store/auth/thunks';
import { useEffect } from 'react';

const startData = {
  code: '',
};
export const ValidateEmail = () => {
  const isAuthenticating = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const { telekinesis } = useSelector((state) => state.auth);
  let token = localStorage.getItem('browser_token');

  const { code, inputHandler, formState } = useForm(startData);

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(sendEmailCode(formState, token, telekinesis));
  };

  useEffect(() => {
    if (isAuthenticating !== 'validateOk') {
      dispatch(reciveEmailCode(telekinesis));
    }
  }, [dispatch, isAuthenticating, telekinesis, token]);

  if (isAuthenticating === 'validateOk') {
    setTimeout(() => {
      dispatch(registerStepThree());
    }, 1000);
  }

  return (
    <Grid
      container
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

      {isAuthenticating === 'validateOk' ? (
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
            Hemos enviado un código de activación a tu dirección de correo
            electrónico. Por favor, verifica tu bandeja de entrada y sigue las
            instrucciones para activar tu cuenta.
          </Typography>

          <form
            onSubmit={submitHandler}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                label="Codigo de Activación"
                placeholder="Codigo de Activación"
                fullWidth
                name="code"
                value={code}
                onChange={inputHandler}
              />
              <Grid item xs={12} sm={12} sx={{ mt: 3 }}>
                <Button
                  disabled={!isAuthenticating}
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                  }}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      )}
    </Grid>
  );
};
