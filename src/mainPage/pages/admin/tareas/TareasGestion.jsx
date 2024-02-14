import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FaRegFolderOpen } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { TareasModal } from '../../../components/tareas/TareasModal';
import { format } from 'date-fns';
import { setStatusTask, setTasks } from '../../../../store/tasks/taskSlider';
import { getServiciosByEnterprise } from '../../../../store/servicios/thunks';
export const TareasGestion = ({ handleNewFormClick }) => {
  const dispatch = useDispatch();
  const columns = [
    'Servicio',
    'Empresas',
    'Contacto',
    'Fecha/Hora',
    'Estado',
    'Acciones',
  ];

  const services = useSelector((state) => state.services.servicesByEnterprises);
  const status = useSelector((state) => state.tasks.status);
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [rows, setRows] = useState([]);
  const [props, setProps] = useState([]);
  const [razonSocial, setRazonSocial] = useState('');

  const enterprises = useSelector(
    (state) => state.services.servicesByEnterprises,
  );

  const enterpriseId = useSelector((state) => state.services.idEnterprise);

  useEffect(() => {
    if (enterpriseId) {
      setRazonSocial(enterpriseId?.razon_social || '');
    }
    if (enterpriseId) {
      setRows(services);
    }
  }, [services, enterpriseId, enterprises]);

  useEffect(() => {
    if (status === 'ok') {
      dispatch(
        getServiciosByEnterprise({
          telekinesis,
          enterprise_id: enterpriseId.enterprise_id,
        }),
        dispatch(setStatusTask('')),
      );
    }
  }, [dispatch, status, telekinesis]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };
  const handleModalOpen = (title, id, status, enterprise_id) => {
    setModalTitle(title);
    setModalOpen(true);
    setProps([{ id, status, enterprise_id }]);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClick = (task) => {
    dispatch(setTasks(task));
    handleNewFormClick(1);
  };
  const filteredRows = (status) => {
    if (status === 1) {
      return 'Pendiente';
    } else if (status === 2) {
      return 'Completado';
    } else {
      return 'Cancelada';
    }
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell textAlign="center" key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.service}</TableCell>
                <TableCell>{razonSocial}</TableCell>
                <TableCell>{enterprises?.email}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{filteredRows(row.status_service)}</TableCell>
                <TableCell>
                  <Tooltip title="Ver Servicio Solicitado" arrow>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleClick(row.task)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Solicitar Turno" arrow>
                    <IconButton
                      edge="end"
                      aria-label="solicitar-turno"
                      hovered="Solicitar Turno"
                      onClick={() =>
                        handleModalOpen(
                          'Solicitar Turno',
                          row.id,
                          row.status,
                          row.enterprise_id,
                        )
                      }
                    >
                      <CalendarMonthIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Subir Documentación" arrow>
                    <IconButton
                      edge="end"
                      aria-label="Subir Documentación"
                      onClick={() =>
                        handleModalOpen(
                          'Subir Documentación',
                          row.id,
                          row.status,
                          row.enterprise_id,
                        )
                      }
                    >
                      <FaRegFolderOpen />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Enviar Formulario" arrow>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        handleModalOpen(
                          'Enviar Formulario',
                          row.id,
                          row.status,
                          row.enterprise_id,
                        )
                      }
                    >
                      <ChecklistIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar Estado" arrow>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() =>
                        handleModalOpen(
                          'Editar Estado',
                          row.id,
                          row.status,
                          row.enterprise_id,
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TareasModal
        open={modalOpen}
        handleClose={handleModalClose}
        iconTitle={modalTitle}
        props={props}
      />
    </>
  );
};
