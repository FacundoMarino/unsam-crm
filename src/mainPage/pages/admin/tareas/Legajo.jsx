import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  Container,
  Dialog,
  DialogContent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Estilo para las pestañas
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { setCrmPage } from '../../../../store/crm/crmSlider';
import { setFormId } from '../../../../store/forms/formSlider';
import { setFile, setTaskId } from '../../../../store/tasks/taskSlider';
import { getTasks } from '../../../../store/tasks/thunks';
import { newNote, solicitarNotas } from '../../../../store/notes/thunks';
import { DocumentacionModal } from './DocumentacionModal';
import { saveAs } from 'file-saver';
import { FaDownload } from 'react-icons/fa';
import {
  selectRole,
  selectUserId,
  setEnterpriseId,
} from '../../../../store/auth/authSlider';
import {
  setIdEnterprise,
  setIdService,
  setServicesByEnterprises,
} from '../../../../store/servicios/servicesSlider';

export const Legajo = ({ setDisplayView }) => {
  const rol = useSelector(selectRole);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const tasksRedux = useSelector((state) => state.tasks.tasks);
  const userId = useSelector(selectUserId);
  const notesRedux = useSelector((state) => state.notes.notes);
  const enterprises = useSelector((state) => state.tasks.enterprises);
  const file = useSelector((state) => state.tasks.file);
  const razonSocial = useSelector(
    (state) => state?.auth?.enterprise?.enterprise_razon_social,
  );

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
    (state) => state.auth.enterprise?.enterprise_id,
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
    if (file) {
      descargarArchivoBase64(file);
    }
  }, [file]);

  const descargarArchivoBase64 = (base64String) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    saveAs(blob, 'archivo.pdf');

    setFile('');
  };

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
      let hourShift = '';
      let dayShift = '';

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
          hourShift = task.turno[0]?.hour;
          dayShift = task.turno[0]?.day;
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
        hourShift: hourShift,
        dayShift: dayShift,
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

  const handleCardClick = (
    id,
    page,
    enterprise_id,
    form_id,
    service_id,
    color,
  ) => {
    if (page === 'formularios') {
      dispatch(setCrmPage(page));
      dispatch(setEnterpriseId(enterprise_id));
      dispatch(setFormId(form_id));
    }

    if (page === 'documentacion' && rol === 'Admin') {
      setProps([{ id, enterprise_id, service_id, color }]);
      handleModalOpen();
    }

    if (page === 'documentacion') {
      setProps([{ id, enterprise_id, service_id, color }]);
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

  // Agrupar las tarjetas por service_id y tipo de tarea
  const groupedCards = cards.reduce((acc, card) => {
    acc[card.service_id] = acc[card.service_id] || {
      documentacion: [],
      formularios: [],
      turnos: [],
    };
    acc[card.service_id][card.type].push(card);
    return acc;
  }, {});

  return (
    <div>
      <AppBar
        position="static"
        style={{ marginBottom: '20px', backgroundColor: '#AC00E3' }}
      >
        <Toolbar>
          <>
            <Grid container>
              <Typography variant="h6" c sx={{ flexGrow: 1 }}>
                {rol === 'Admin' ? enterprise?.razon_social : razonSocial}
              </Typography>
              <Typography
                variant="h6"
                style={{ textAlign: 'end' }}
                sx={{ flexGrow: 1 }}
              ></Typography>
            </Grid>
          </>
        </Toolbar>
      </AppBar>

      <Tabs>
        <TabList>
          {Object.keys(groupedCards).map((serviceId, index) => (
            <Tab key={index}>Service {serviceId}</Tab>
          ))}
        </TabList>
        {Object.keys(groupedCards).map((serviceId, index) => (
          <TabPanel key={index}>
            <Grid container spacing={2}>
              {Object.keys(groupedCards[serviceId]).map((taskType) => (
                <React.Fragment key={taskType}>
                  {groupedCards[serviceId][taskType].map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card
                        style={{
                          color: card.color,
                          cursor: rol !== 'Admin' ? 'pointer' : 'default',
                          marginBottom: '20px',
                        }}
                        onClick={() =>
                          handleCardClick(
                            card.id,
                            card.type,
                            card.enterprise_id,
                            card.form_id,
                            card.service_id,
                            card.color,
                          )
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
                          {card.hourShift && (
                            <Typography>
                              Hora del Turno: {card.hourShift}
                            </Typography>
                          )}
                          {card.dayShift && (
                            <Typography>
                              Fecha del Turno: {formatDate(card.dayShift)}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </Tabs>

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
