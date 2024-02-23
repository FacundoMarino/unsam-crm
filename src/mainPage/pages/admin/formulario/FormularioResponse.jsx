import { Container, Divider, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

export const FormularioResponse = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form>
          <Typography marginBottom={2} marginTop={2} variant="h5">
            Formulario
          </Typography>
          <Divider />
        </form>
      </Paper>
    </Container>
  );
};
