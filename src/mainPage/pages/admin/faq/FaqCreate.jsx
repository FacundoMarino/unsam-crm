import React, { useEffect, useState } from 'react';
import {
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
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
  }, [dispatch, telekinesis]);

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
        <Grid container justifyContent={'flex-end'}>
          <Button
            style={{ backgroundColor: '#AC00E3', color: 'white', margin: 5 }}
            onClick={handlerNuevoServicio}
            startIcon={<AddIcon />}
          >
            Nueva Pregunta
          </Button>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    textAlign: 'center',
                    borderBottom: '2.5px solid #AC00E3',
                    fontWeight: 'bold',
                    width: '50%',
                  }}
                >
                  PREGUNTA
                </TableCell>
                <TableCell
                  style={{
                    textAlign: 'center',
                    borderBottom: '2.5px solid #AC00E3',
                    fontWeight: 'bold',
                    width: '50%',
                  }}
                >
                  ACCIONES
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {faqs?.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell
                    style={{
                      textAlign: 'center',
                    }}
                  >
                    {faq.question}
                  </TableCell>
                  <TableCell
                    style={{
                      textAlign: 'center',
                    }}
                  >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <FaqModal open={isModalOpen} handleClose={handleClose} user={user} />
      </Container>
    </>
  );
};
