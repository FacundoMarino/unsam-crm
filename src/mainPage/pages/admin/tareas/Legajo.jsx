import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
  TextField,
  Container,
  Dialog,
  DialogContent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole, setEnterpriseId } from '../../../../store/auth/authSlider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { setCrmPage } from '../../../../store/crm/crmSlider';
import { setFormId } from '../../../../store/forms/formSlider';
import { setTaskId } from '../../../../store/tasks/taskSlider';
import { getTasks } from '../../../../store/tasks/thunks';
import { newNote, solicitarNotas } from '../../../../store/notes/thunks';
import { setIdService } from '../../../../store/servicios/servicesSlider';

export const Legajo = ({ setDisplayView }) => {
  const rol = useSelector(selectRole);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const tasksRedux = useSelector((state) => state.tasks.tasks);
  const enterpriseExternal = useSelector((state) => state.auth.enterprise);
  const notesRedux = useSelector((state) => state.notes.notes);

  const [cards, setCards] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState([]);

  const enterpriseId = useSelector((state) => state.services.idEnterprise);

  useEffect(() => {
    if (rol !== 'Admin') {
      dispatch(
        getTasks({
          telekinesis,
          enterprise_id: enterpriseExternal.enterprise_id,
        }),
      );
    }

    if (rol === 'Admin' && tasksRedux.length > 0) {
      dispatch(
        solicitarNotas({
          telekinesis,
          enterprise_id: enterpriseId.enterprise_id,
          service_id: tasksRedux[0].service_id,
        }),
      );
    }
  }, [dispatch, rol, telekinesis]);

  useEffect(() => {
    if (notes) {
      setNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    const mappedCards = tasksRedux.map((task) => {
      let cardTitle = '';
      let cardContent = '';
      let cardColor = '';
      let icon = null;
      let taskTypeLabel = '';
      let tipoTarea = '';
      let id = '';
      let enterprise_id = '';
      let form_id = '';
      let service_id = '';

      const fecha = task.created_at;

      switch (task.tipo_tarea) {
        case 2:
          enterprise_id = task.enterprise_id;
          service_id = task.service_id;
          id = task.id;
          tipoTarea = 'documentacion';
          cardTitle = 'Tarea Documentación';
          taskTypeLabel = 'Subir la documentación:';
          cardContent = `${taskTypeLabel} ${
            task.documentation_name
          }\nFecha: ${new Date(fecha).toLocaleDateString()}\nComentarios: ${
            task.comment
          }`;
          cardColor = task.status === 1 ? 'red' : 'green';
          icon = task.status === 1 ? <ErrorIcon /> : <CheckCircleIcon />;
          break;
        case 1:
          enterprise_id = task.enterprise_id;
          service_id = task.service_id;
          id = task.id;
          tipoTarea = 'turnos';
          cardTitle = 'Turnos Admisión';
          taskTypeLabel = 'Turno:';
          cardContent = `${taskTypeLabel} ${task.shift_type}\nComentarios: ${
            task.comment
          }\nFecha: ${new Date(fecha).toLocaleDateString()}`;
          cardColor = task.status === 1 ? 'red' : 'green';
          icon = task.status === 1 ? <ErrorIcon /> : <CheckCircleIcon />;
          break;
        case 3:
          enterprise_id = task.enterprise_id;
          service_id = task.service_id;
          id = task.id;
          form_id = task.form_id;
          tipoTarea = 'formularios';
          cardTitle = 'Formularios';
          taskTypeLabel = 'Completar el formulario:';
          cardContent = `${taskTypeLabel} ${task.form_id}\n Comentarios: ${
            task.comment
          }\n Fecha: ${new Date(fecha).toLocaleDateString()}`;
          cardColor = task.status === 1 ? 'red' : 'green';
          icon = task.status === 1 ? <ErrorIcon /> : <CheckCircleIcon />;
          break;
        default:
          break;
      }

      return {
        enterprise_id: enterprise_id,
        id: id,
        type: tipoTarea,
        title: cardTitle,
        content: cardContent,
        color: cardColor,
        icon: icon,
        form_id: form_id,
        service_id: service_id,
      };
    });

    if (rol === 'Admin') {
      const empresasCard = {
        title: enterpriseId?.razon_social,
        content: `Nombre: ${enterpriseId?.razon_social}\n Descripción: ${enterpriseId?.description}\n Dirección: ${enterpriseId?.address} `,
        color: 'black',
      };
      mappedCards.unshift(empresasCard);
    } else {
      const empresaCard = {
        title: enterpriseExternal.enterprise_razon_social,
        content: `Nombre: ${enterpriseExternal.enterprise_razon_social}\n Descripción: ${enterpriseExternal.enterprise_description}\n Dirección: ${enterpriseExternal.enterprise_address} `,
        color: 'black',
      };
      mappedCards.unshift(empresaCard);
    }

    setCards(mappedCards);
  }, [tasksRedux]);

  useEffect(() => {
    if (note.length > 0 && rol === 'Admin' && tasksRedux.length > 0) {
      dispatch(
        newNote({
          telekinesis,
          enterprise_id: enterpriseId.enterprise_id,
          service_id: tasksRedux[0].service_id,
          note,
        }),
      );
      setNote([]);
    }
  }, [note, dispatch]);

  const handleAddCard = () => {
    const newCard = { title: 'Nota', content: newNoteContent };
    setNote([newCard]);

    setNewNoteContent('');
    setIsModalOpen(false);
  };

  const handleCardClick = (id, page, enterprise_id, form_id, service_id) => {
    if (page === 'formularios') {
      dispatch(setCrmPage(page));
      dispatch(setEnterpriseId(enterprise_id));
      dispatch(setFormId(form_id));
    }
    dispatch(setCrmPage(page));
    dispatch(setTaskId(id));

    dispatch(setIdService(service_id));
  };

  console.log(note);
  return (
    <div>
      <Grid container spacing={2}>
        {cards.map((card, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              style={{
                color: card.color,
                cursor: rol !== 'Admin' ? 'pointer' : 'default',
              }}
              onClick={
                rol !== 'Admin' && card.color !== 'green'
                  ? () =>
                      handleCardClick(
                        card.id,
                        card.type,
                        card.enterprise_id,
                        card.form_id,
                        card.service_id,
                      )
                  : null
              }
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.title}
                </Typography>
                <Divider />
                <Typography component="div" mt={2}>
                  {card.content.split('\n').map((line, lineIndex) => (
                    <div key={lineIndex}>{line}</div>
                  ))}
                </Typography>
                {card.icon && <div>{card.icon}</div>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {rol === 'Admin' && (
        <div>
          <Button
            style={{ marginTop: '20px' }}
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
          >
            Agregar Nota
          </Button>
          <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <Container
              component="main"
              maxWidth="xs"
              style={{ width: '500px' }}
            >
              <DialogContent>
                {rol === 'Admin' && tasksRedux.length > 0 ? (
                  <>
                    <Typography
                      id="modal-title"
                      variant="h6"
                      component="h2"
                      gutterBottom
                    >
                      Agregar Nota
                    </Typography>
                    <TextField
                      id="note-content"
                      label="Contenido de la nota"
                      margin="normal"
                      multiline
                      rows={4}
                      variant="outlined"
                      fullWidth
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                    />
                  </>
                ) : null}

                <Grid container spacing={2} justifyContent={'flex-end'}>
                  <Grid item xs={12} sm={6}>
                    <Button
                      style={{ marginTop: '20px' }}
                      variant="contained"
                      color="primary"
                      onClick={handleAddCard}
                      fullWidth
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
            </Container>
          </Dialog>
        </div>
      )}
    </div>
  );
};
