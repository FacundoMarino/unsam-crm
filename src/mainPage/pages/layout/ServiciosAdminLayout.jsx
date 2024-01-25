import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  Box,
  Grid,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { TareasModal } from '../../components/tareas/TareasModal';
import { getEnterprises, getTasks } from '../../../store/tasks/thunks';
import { ServiciosModal } from '../../components/servicios/ServiciosModal';
import { setEntepriseId } from '../../../store/tasks/taskSlider';
export const ServiciosAdminLayout = () => {
  const [selectedCompany, setSelectedCompany] = useState('');

  const columns = [
    'Servicio',
    'Empresas',
    'Contacto',
    'Fecha/Hora',
    'Estado',
    'Acciones',
  ];

  const tasks = useSelector((state) => state.tasks.tasks);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [rows, setRows] = useState([]);
  const [props, setProps] = useState([]);

  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);

  const enterprises = useSelector((state) => state.tasks.enterprises);

  useEffect(() => {
    dispatch(getTasks({ telekinesis, enterprise_id: selectedCompany }));
  }, [selectedCompany]);

  useEffect(() => {
    dispatch(getEnterprises({ telekinesis }));
  }, [dispatch, telekinesis]);

  useEffect(() => {
    if (tasks) {
      setRows(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    dispatch(setEntepriseId(selectedCompany));
  }, [selectedCompany]);

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
  const filteredRows = (status) => {
    if (status === 1) {
      return 'Pendiente';
    } else if (status === 2) {
      return 'Completado';
    } else {
      return 'Cancelada';
    }
  };

  const filterServices = (services) => {
    if (services === 1) {
      return 'Solicitar Turno';
    } else if (services === 2) {
      return 'Enviar Tarea';
    } else if (services === 3) {
      return 'Enviar Formulario';
    }
  };
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };
  return (
    <>
      <Grid container>
        <Box>
          <Select
            value={selectedCompany}
            onChange={handleCompanyChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Seleccione la Empresa
            </MenuItem>
            {enterprises?.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.razon_social}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={() => handleModalOpen(true)}>Abrir Modal</Button>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell textAlign="center" gr key={index}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{filterServices(row.tipo_tarea)}</TableCell>
                <TableCell>{enterprises?.razon_social}</TableCell>
                <TableCell>{enterprises?.email}</TableCell>
                <TableCell>{formatDate(row.created_at)}</TableCell>
                <TableCell>{filteredRows(row.status)}</TableCell>
                <TableCell>
                  <Tooltip title="Ver Servicio Solitado" arrow>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() =>
                        handleModalOpen(
                          'Ver Servicios',
                          row.id,
                          row.status,
                          row.enterprise_id,
                        )
                      }
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Solicitar Turno" arrow>
                    <IconButton
                      edge="end"
                      aria-label="add-step"
                      hovered="Agregar step"
                      onClick={() => handleModalOpen('Solicitar Turno')}
                    >
                      <CalendarMonthIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Enviar Tarea" arrow>
                    <IconButton
                      edge="end"
                      aria-label="Enviar Tarea"
                      onClick={() => handleModalOpen('Enviar Tarea')}
                    >
                      <ChecklistIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Enviar Formulario" arrow>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleModalOpen('Enviar Formulario')}
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
      <ServiciosModal
        open={modalOpen}
        handleClose={handleModalClose}
        selectedCompany={selectedCompany}
      />
    </>
  );
};
