import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Toolbar,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ServicioCreateModal } from './ServicioCreateModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  eliminarServicio,
  getServicios,
} from '../../../../store/servicios/thunks';
import {
  setIndividualService,
  setStatus,
} from '../../../../store/servicios/servicesSlider';

export const ServicioGestion = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const servicios = useSelector((state) => state.services.services);
  const status = useSelector((state) => state.services.status);
  const dispatch = useDispatch();

  const [isModalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'ok') {
      dispatch(getServicios({ telekinesis }));
      dispatch(setStatus(''));
    }
  }, [status]);

  useEffect(() => {
    dispatch(getServicios({ telekinesis }));
    dispatch(setStatus(''));
  }, []);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setId('');
    dispatch(setIndividualService([]));
  };

  const handlerNuevoServicio = () => {
    handleModalOpen();
  };

  const handleEliminar = (id) => {
    dispatch(eliminarServicio({ telekinesis, id }));
  };

  const handleEditar = (id) => {
    setId(id);
    handleModalOpen();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'SERVICIO',
        accessor: 'service',
      },
      {
        Header: 'ACCIONES',
        Cell: ({ row }) => (
          <>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => handleEditar(row.original.id)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => handleEliminar(row.original.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [],
  );

  const data = React.useMemo(() => servicios || [], [servicios]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

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

  const { pageIndex, pageSize, globalFilter } = state;

  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((row) =>
      row.service.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return (
    <>
      <Container>
        <Grid container justifyContent={'flex-end'} alignItems={'center'}>
          <Button
            style={{ backgroundColor: '#AC00E3', color: 'white', margin: 5 }}
            onClick={handlerNuevoServicio}
            startIcon={<AddIcon />}
          >
            Nuevo Servicio
          </Button>
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
                    <TableCell
                      style={{
                        textAlign: 'center',
                        borderBottom: '2.5px solid #AC00E3',
                        fontWeight: 'bold',
                        width: '50%',
                      }}
                      {...column.getHeaderProps()}
                    >
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
                    {row.cells.map((cell) => (
                      <TableCell
                        style={{
                          textAlign: 'center',
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <ServicioCreateModal
          open={isModalOpen}
          handleClose={handleClose}
          id={id}
        />
      </Container>
    </>
  );
};
