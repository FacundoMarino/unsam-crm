import {
  AppBar,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { FaqModal } from './FaqModal';
import {
  borrarPregunta,
  verPregunta,
  verTodasPreguntas,
} from '../../../../store/faq/thunks';
import { setIndividualFaq } from '../../../../store/faq/faqSlider';

export const FaqCreate = ({ setDisplayView, handleNewFormClick }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const user = useSelector((state) => state.users.individualUser);
  const faqs = useSelector((state) => state.faq.faqs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verTodasPreguntas({ telekinesis }));
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    dispatch(setIndividualFaq([]));
  };
  const handlerNuevoServicio = () => {
    handleModalOpen();
  };

  const handleEliminar = (id) => {
    dispatch(borrarPregunta({ telekinesis, id }));
  };

  const handleEditar = (id) => {
    dispatch(verPregunta({ telekinesis, id }));

    handleModalOpen();
  };

  const handleVer = (id) => {
    handleNewFormClick(1);
    setDisplayView('');
    dispatch(verPregunta({ telekinesis, id }));
  };

  return (
    <>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pregunta-Respuesta
            </Typography>
            <Button
              color="inherit"
              onClick={handlerNuevoServicio}
              startIcon={<AddIcon />}
            >
              Nueva Pregunta
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {faqs?.map((faq) => (
            <ListItem key={faq.id}>
              <ListItemText primary={faq.question} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditar(faq.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleEliminar(faq.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <FaqModal open={isModalOpen} handleClose={handleClose} user={user} />
      </Container>
    </>
  );
};
