import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getEnterprises } from '../../../../store/tasks/thunks';
import { getServiciosByEnterprise } from '../../../../store/servicios/thunks';
import { setIdEnterprise } from '../../../../store/servicios/servicesSlider';

export const ServicioEmpresas = ({
  handleNewFormClick,
  setDisplayView,
  setDisplayViewLegajo,
}) => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const enterprises = useSelector((state) => state.tasks.enterprises);

  useEffect(() => {
    setDisplayViewLegajo('none');
    setDisplayView('none');
  }, []);
  useEffect(() => {
    dispatch(getEnterprises({ telekinesis }));
  }, [dispatch, telekinesis]);

  const handleModalOpen = (
    enterprise_id,
    razon_social,
    address,
    description,
  ) => {
    dispatch(
      setIdEnterprise({ enterprise_id, razon_social, address, description }),
    );
    dispatch(getServiciosByEnterprise({ telekinesis, enterprise_id }));
    handleNewFormClick(0);
    setDisplayView('');
  };

  const data = React.useMemo(() => enterprises || [], [enterprises]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Empresa',
        accessor: 'razon_social',
      },
      {
        Header: 'Descripción',
        accessor: 'description',
      },
      {
        Header: 'Domicilio',
        accessor: 'address',
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <Tooltip title="Ver Servicio Solicitado" arrow>
            <IconButton
              edge="end"
              aria-label="view"
              onClick={() =>
                handleModalOpen(
                  row.original.id,
                  row.original.razon_social,
                  row.original.address,
                  row.original.description,
                )
              }
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
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
                  <TableCell
                    style={{
                      borderBottom: '5px solid #6A51e1',
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
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
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
    </>
  );
};
