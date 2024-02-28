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
import { format } from 'date-fns';
import {
  selectRole,
  selectUserId,
  setEnterpriseId,
} from '../../../../store/auth/authSlider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { setCrmPage } from '../../../../store/crm/crmSlider';
import { setFormId } from '../../../../store/forms/formSlider';
import { setTaskId, setTasks } from '../../../../store/tasks/taskSlider';
import { getTasks } from '../../../../store/tasks/thunks';
import { newNote, solicitarNotas } from '../../../../store/notes/thunks';
import {
  setIdEnterprise,
  setIdService,
  setServicesByEnterprises,
} from '../../../../store/servicios/servicesSlider';
import { DocumentacionModal } from './DocumentacionModal';

export const Legajo = ({ setDisplayView }) => {
  const rol = useSelector(selectRole);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const tasksRedux = useSelector((state) => state.tasks.tasks);
  const userId = useSelector(selectUserId);
  const enterpriseExternal = useSelector((state) => state.auth.enterprise);
  const notesRedux = useSelector((state) => state.notes.notes);
  const enterprises = useSelector((state) => state.tasks.enterprises);

  const [cards, setCards] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState([]);
  const [enterprise, setEnterprise] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [props, setProps] = useState([]);

  const enterpriseId = useSelector((state) => state.services.idEnterprise);
  const taskEnterpriseId = useSelector((state) => state.tasks.entepriseId);
  const enterpriseTaskExternal = useSelector(
    (state) => state.auth.enterprise.enterprise_id,
  );

  useEffect(() => {
    if (rol === 'Admin' && tasksRedux.length > 0) {
      dispatch(
        solicitarNotas({
          telekinesis,
          enterprise_id: taskEnterpriseId,
          service_id: tasksRedux[0].service_id,
        }),
      );
    }
    if (rol !== 'Admin') {
      dispatch(
        getTasks({ telekinesis, enterprise_id: enterpriseTaskExternal }),
      );
    }
  }, [dispatch, rol, telekinesis]);

  useEffect(() => {
    if (notes) {
      setNotes(notes);
    }
  }, [notes]);

  useEffect(() => {
    setEnterprise(
      enterprises.find((enterprise) => enterprise.id === taskEnterpriseId),
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setServicesByEnterprises([]));
      dispatch(setIdEnterprise(''));
    };
  }, []);

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

    setCards(mappedCards);
  }, [tasksRedux]);

  useEffect(() => {
    if (note.length > 0 && rol === 'Admin' && tasksRedux.length > 0) {
      dispatch(
        newNote({
          telekinesis,
          enterprise_id: taskEnterpriseId,
          service_id: tasksRedux[0].service_id,
          user_id: userId,
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
    if (page === 'documentacion') {
      setProps([{ id, enterprise_id, service_id }]);
      handleModalOpen();
    } else {
      dispatch(setCrmPage(page));
      dispatch(setTaskId(id));

      dispatch(setIdService(service_id));
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  // Filtrar las tarjetas por tipo de tarea
  const documentacionCards = cards.filter(
    (card) => card.type === 'documentacion',
  );
  const formulariosCards = cards.filter((card) => card.type === 'formularios');
  const turnosCards = cards.filter((card) => card.type === 'turnos');

  return (
    <div>
      <Grid container spacing={2}>
        {/* Columna de Documentación */}
        <Grid item xs={12} sm={6} md={4} mb={2}>
          {documentacionCards.map((card, index) => (
            <Card
              key={index}
              style={{
                color: card.color,
                cursor: rol !== 'Admin' ? 'pointer' : 'default',
                marginBottom: '20px',
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
          ))}
        </Grid>
        {/* Columna de Formularios */}
        <Grid item xs={12} sm={6} md={4} mb={2}>
          {formulariosCards.map((card, index) => (
            <Card
              key={index}
              style={{
                color: card.color,
                cursor: rol !== 'Admin' ? 'pointer' : 'default',
                marginBottom: '20px',
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
          ))}
        </Grid>
        {/* Columna de Turnos */}
        <Grid item xs={12} sm={6} md={4}>
          {turnosCards.map((card, index) => (
            <Card
              key={index}
              style={{
                color: card.color,
                cursor: rol !== 'Admin' ? 'pointer' : 'default',
                marginBottom: '20px',
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
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {notesRedux?.map((noteR, index) => (
          <Grid item xs={12} sm={6} md={4} mb={2} key={index}>
            <Card ket={index}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {noteR.title}
                </Typography>
                <Divider />
                <Typography component="div" mt={2}>
                  {noteR.content}
                </Typography>
                <Grid
                  item
                  xs={12}
                  key={index}
                  mt={6}
                  display={'flex'}
                  justifyContent={'flex-end'}
                >
                  <Typography
                    variant="span"
                    gutterBottom
                    fullWidth
                    style={{ fontSize: '12px' }}
                  >
                    {formatDate(noteR.created_at)}
                  </Typography>
                </Grid>
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
              </DialogContent>
            </Container>
          </Dialog>
        </div>
      )}
      <DocumentacionModal
        open={modalOpen}
        handleClose={handleModalClose}
        props={props}
      />
    </div>
  );
};
