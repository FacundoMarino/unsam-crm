import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createServices,
  getServiciosById,
  updateServicio,
} from '../../../../store/servicios/thunks';
import { setIndividualService } from '../../../../store/servicios/servicesSlider';

export const ServicioCreateModal = ({ open, handleClose, id }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const serviceIndividual = useSelector(
    (state) => state.services.individualService,
  );

  const dispatch = useDispatch();
  const [textareaValue, setTextareaValue] = useState('');
  const [title, setTitle] = useState('');
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getServiciosById({ telekinesis, id }));
    }
  }, [id]);

  useEffect(() => {
    if (open) {
      setTitle('');
      setTextareaValue('');
    }
  }, [open]);

  useEffect(() => {
    if (serviceIndividual.id) {
      setTextareaValue(serviceIndividual.description);
      setTitle(serviceIndividual.service);
      setUpdate(true);
    }
  }, [serviceIndividual]);

  const handleSubmit = () => {
    if (serviceIndividual.id) {
      dispatch(
        updateServicio({
          telekinesis,
          id,
          service: title,
          description: textareaValue,
        }),
      );
      setUpdate(false);
      setIndividualService('');
      setTitle('');
      setTextareaValue('');
    } else {
      dispatch(
        createServices({
          telekinesis,
          service: title,
          description: textareaValue,
        }),
      );
    }
    handleClose(false);
    setUpdate(false);
    setIndividualService('');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Servicios</DialogTitle>
        <DialogContent>
          <>
            <TextField
              label="Título"
              multiline
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Descripcion"
              multiline
              rows={4}
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#6A51e1' }}
                  onClick={() => handleClose(false)}
                  fullWidth
                >
                  Cancelar
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#6A51e1' }}
                  onClick={() => handleSubmit()}
                  fullWidth
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </>
        </DialogContent>
      </Container>
    </Dialog>
  );
};
