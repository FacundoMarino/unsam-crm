import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import { useForm } from '../../../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { crearPregunta } from '../../../../store/faq/thunks';

export const FaqModal = ({ open, handleClose }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const individualFaq = useSelector((state) => state.faq.faqIndividual);

  const [formData, setFormData] = useState({
    question: '',
    response: '',
  });

  useEffect(() => {
    if (individualFaq) {
      setFormData(individualFaq);
    }
  }, [individualFaq]);

  const { question, response, inputHandler, formState } = useForm(formData);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(crearPregunta({ telekinesis, ...formState }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Container component="main" maxWidth="xs" style={{ width: '500px' }}>
        <DialogTitle>Nueva Pregunta-Respuesta</DialogTitle>
        <DialogContent>
          <form
            onSubmit={submitHandler}
            className="animate__animated animate__fadeIn animate__faster"
          >
            <FormControl fullWidth margin="normal">
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    label={question ? '' : 'Pregunta'}
                    multiline
                    value={question}
                    placeholder="Pregunta"
                    name="question"
                    onChange={inputHandler}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sx={{ mt: 3 }}>
                  <TextareaAutosize
                    style={{
                      width: '100%',
                      height: '100px',
                      resize: 'none',
                    }}
                    label={response ? '' : 'Respuesta'}
                    multiline
                    value={response}
                    name="response"
                    placeholder={response ? '' : 'Respuesta'}
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
                    Guardar Pregunta
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
