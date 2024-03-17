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
  TextField,
  Button,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UsuarioModal } from './UsuarioModal';
import {
  eliminarUsuario,
  verUsuario,
  verUsuarios,
} from '../../../../store/users/thunks';
import {
  setIndividualUser,
  setStatusUser,
} from '../../../../store/users/usersSlider';
import { useDispatch, useSelector } from 'react-redux';

export const UsuariosGestion = ({ setDisplayView, handleNewFormClick }) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const user = useSelector((state) => state.users.individualUser);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verUsuarios({ telekinesis }));
    dispatch(setStatusUser(''));
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    dispatch(setIndividualUser([]));
  };

  const handlerNuevoServicio = () => {
    handleModalOpen();
  };

  const handleEliminar = (id) => {
    dispatch(eliminarUsuario({ telekinesis, id }));
    dispatch(setStatusUser('ok'));
  };

  const handleEditar = (id) => {
    dispatch(verUsuario({ telekinesis, id }));
    setEdit(true);
    handleModalOpen();
  };

  const handleRole = (rol) => {
    if (rol === 1) {
      return 'Administrador';
    } else if (rol === 2) {
      return 'Interno';
    } else if (rol === 4) {
      return 'Externo';
    } else if (rol === 3) {
      return 'Consultor';
    }
  };

  const handleVer = (id) => {
    handleNewFormClick(1);
    setDisplayView('');
    dispatch(verUsuario({ telekinesis, id }));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'NOMBRE',
        accessor: 'name',
      },
      {
        Header: 'APELLIDO',
        accessor: 'apellido',
      },
      {
        Header: 'ROL',
        accessor: 'rol',
        Cell: ({ value }) => handleRole(value),
      },
      {
        Header: 'EMAIL',
        accessor: 'email',
      },
      {
        Header: 'ACCIONES',
        Cell: ({ row }) => (
          <>
            <Tooltip title="Ver Usuario" arrow>
              <IconButton
                edge="end"
                aria-label="view"
                onClick={() => handleVer(row.original.id)}
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar Usuario" arrow>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditar(row.original.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar Usuario" arrow>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleEliminar(row.original.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    ],
    [],
  );

  const data = React.useMemo(() => users, [users]);

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

  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return data.filter((row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  return (
    <>
      <Grid container justifyContent={'flex-end'} alignItems={'center'}>
        <Button
          style={{ backgroundColor: '#AC00E3', color: 'white', margin: 5 }}
          onClick={handlerNuevoServicio}
          startIcon={<AddIcon />}
        >
          Nuevo Usuario
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
                      borderBottom: '2.5px solid #AC00E3',
                      fontWeight: 'bold',
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
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </Grid>
      <UsuarioModal
        edit={edit}
        open={isModalOpen}
        handleClose={handleClose}
        user={user}
      />
    </>
  );
};
