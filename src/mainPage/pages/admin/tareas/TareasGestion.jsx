import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
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
  Grid,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { FaRegFolderOpen } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { TareasModal } from '../../../components/tareas/TareasModal';
import { format } from 'date-fns';
import {
  setEntepriseId,
  setStatusTask,
  setTasks,
} from '../../../../store/tasks/taskSlider';
import { getServiciosByEnterprise } from '../../../../store/servicios/thunks';
import { getAllService } from '../../../../store/tasks/thunks';
import { setServicesByEnterprises } from '../../../../store/servicios/servicesSlider';

export const TareasGestion = ({ handleNewFormClick, setDisplayViewLegajo }) => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.servicesByEnterprises);
  const status = useSelector((state) => state.tasks.status);
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const enterpriseId = useSelector((state) => state.services.idEnterprise);
  const allServices = useSelector((state) => state.services.allServices);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [props, setProps] = useState([]);
  const [razonSocial, setRazonSocial] = useState('');

  useEffect(() => {
    setDisplayViewLegajo('none');

    return () => {
      dispatch(setServicesByEnterprises([]));
    };
  }, []);

  useEffect(() => {
    if (enterpriseId) {
      setRazonSocial(enterpriseId?.razon_social || '');
    }
  }, [enterpriseId]);

  useEffect(() => {
    if (!enterpriseId) {
      dispatch(getAllService({ telekinesis }));
    }

    if (status === 'ok' && enterpriseId) {
      dispatch(
        getServiciosByEnterprise({
          telekinesis,
          enterprise_id: enterpriseId.enterprise_id,
        }),
        dispatch(setStatusTask('')),
      );
    }
  }, [dispatch, status, telekinesis, enterpriseId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy');
  };

  const handleModalOpen = (title, id, status, enterprise_id) => {
    dispatch(setEntepriseId(enterprise_id));

    setModalTitle(title);
    setModalOpen(true);
    setProps([{ id, status, enterprise_id }]);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleClick = (task, enterprise_id) => {
    dispatch(setEntepriseId(enterprise_id));
    dispatch(setTasks(task));
    setDisplayViewLegajo('');
    handleNewFormClick(3);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Servicio',
        accessor: 'service',
      },
      {
        Header: 'Empresa',
        accessor: 'razonSocial',
      },
      {
        Header: 'Contacto',
        accessor: 'email',
      },
      {
        Header: 'Fecha',
        accessor: 'created_at',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Estado',
        accessor: 'status_service',
        Cell: ({ value }) =>
          value === 1 ? 'Pendiente' : value === 2 ? 'Completado' : 'Cancelada',
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            <Tooltip title="Ver Servicio Solicitado" arrow>
              <IconButton
                edge="end"
                aria-label="view"
                onClick={() =>
                  handleClick(row.original.task, row.original.enterprise_id)
                }
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
                    row.original.id,
                    row.original.status,
                    row.original.enterprise_id,
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
                    row.original.id,
                    row.original.status,
                    row.original.enterprise_id,
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
                    row.original.id,
                    row.original.status,
                    row.original.enterprise_id,
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
                    row.original.id,
                    row.original.status,
                    row.original.enterprise_id,
                  )
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    [],
  );

  const data = React.useMemo(() => {
    if (!services || services.length === 0) {
      return allServices
        ? allServices.flatMap((service) =>
            service.services.map((innerService) => ({
              ...innerService,
              razonSocial: service.razon_social,
              email: service.contact,
            })),
          )
        : [];
    }
    return services.map((service) => ({
      ...service,
      razonSocial: razonSocial,
    }));
  }, [services, allServices, razonSocial]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    gotoPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
  );

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <Grid container justifyContent={'flex-end'}>
        <div>
          <input
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Buscar..."
          />
        </div>
      </Grid>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container mt={2} justifyContent={'flex-end'}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <span>
          Página
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Siguiente
        </button>
        <span>
          | Ir a la página
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </Grid>
      <TareasModal
        open={modalOpen}
        handleClose={handleModalClose}
        iconTitle={modalTitle}
        props={props}
      />
    </>
  );
};
