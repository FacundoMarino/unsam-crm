import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectRole, setEnterpriseId } from '../../../../store/auth/authSlider';
import { getTasks } from '../../../../store/tasks/thunks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { setCrmPage } from '../../../../store/crm/crmSlider';
import { setFormId } from '../../../../store/forms/formSlider';
import { setTaskId } from '../../../../store/tasks/taskSlider';

export const Legajo = () => {
  const rol = useSelector(selectRole);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const tasksRedux = useSelector((state) => state.tasks.tasks);
  const enterprises = useSelector((state) => state.tasks.enterprises);
  const enterpriseExternal = useSelector((state) => state.auth.enterprise);
  const enterpriseId = useSelector((state) => state.tasks.entepriseId);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (rol === 'Admin') {
      dispatch(getTasks({ telekinesis, enterprise_id: enterpriseId }));
    } else {
      dispatch(
        getTasks({
          telekinesis,
          enterprise_id: enterpriseExternal.enterprise_id,
        }),
      );
    }
  }, [dispatch, telekinesis]);

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

      const fecha = task.created_at;

      switch (task.tipo_tarea) {
        case 2:
          enterprise_id = task.enterprise_id;
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
      };
    });

    if (rol === 'Admin') {
      const empresasCard = {
        title: enterprises[0]?.razon_social,
        content: `Nombre: ${enterprises[0]?.razon_social}\n Descripción: ${enterprises[0]?.description}\n Dirección: ${enterprises[0]?.address} `,
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

  const handleAddCard = () => {
    const newCard = { title: 'Nota', content: 'Contenido de la Nota' };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleCardClick = (id, page, enterprise_id, form_id) => {
    if (page === 'formularios') {
      dispatch(setCrmPage(page));
      dispatch(setEnterpriseId(enterprise_id));
      dispatch(setFormId(form_id));
    }
    dispatch(setCrmPage(page));
    dispatch(setTaskId(id));
  };

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
                rol !== 'Admin'
                  ? () =>
                      handleCardClick(
                        card.id,
                        card.type,
                        card.enterprise_id,
                        card.form_id,
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
        <Button
          style={{ marginTop: '20px' }}
          variant="outlined"
          onClick={handleAddCard}
        >
          Agregar Nota
        </Button>
      )}
    </div>
  );
};
