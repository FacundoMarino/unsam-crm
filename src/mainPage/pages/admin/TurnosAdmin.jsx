import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import {
  asignarTurno,
  cancelarTurno,
  desasignarTurno,
  finalizarTurno,
  verTodosLosTurnosTomados,
} from '../../../store/shift/thunks';
import { useDispatch, useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)({
  padding: '10px',
  fontSize: '12px',
  margin: '5px',
});

const StyledButton = styled(Button)({
  fontSize: '12px',
});

export const TurnosDisponibles = ({ setDisplayCreateShift }) => {
  const turnosDisponibles = useSelector((state) => state.shift.shiftsTakes);
  const dispatch = useDispatch();
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  useEffect(() => {
    dispatch(verTodosLosTurnosTomados({ telekinesis }));
  }, []);
  useEffect(() => {
    setDisplayCreateShift('none');
  }, []);

  const handleTakeTurn = (id) => {
    dispatch(asignarTurno({ telekinesis, id }));
  };

  const handleCancelTurn = (id) => {
    dispatch(cancelarTurno({ telekinesis, id }));
  };

  const handleUnassignTurn = (id) => {
    dispatch(desasignarTurno({ telekinesis, id }));
  };

  const handleEndTurn = (id) => {
    dispatch(finalizarTurno({ telekinesis, id }));
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return 'Solicitado';
      case 2:
        return 'Tomado';
      case 3:
        return 'Cancelado';
      case 4:
        return 'Finalizado';
      default:
        return '';
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: `user_name`,
      },
      {
        Header: 'Apellido',
        accessor: `user_last_name`,
      },
      {
        Header: 'Tipo de Turno',
        accessor: 'shift_type',
      },
      {
        Header: 'Servicio',
        accessor: 'servicio',
      },
      {
        Header: 'Modalidad',
        accessor: 'modalidad',
      },
      {
        Header: 'Fecha',
        accessor: 'day',
      },
      {
        Header: 'Hora',
        accessor: 'hour',
      },
      {
        Header: 'Estado',
        accessor: 'shift_status',
        Cell: ({ value }) => getStatusText(value),
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            {row.original.shift_status === 1 && (
              <Grid>
                <StyledButton
                  variant="contained"
                  color="primary"
                  style={{ margin: '5px' }}
                  onClick={() => handleTakeTurn(row.original.turno_id)}
                >
                  Tomar Turno
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCancelTurn(row.original.turno_id)}
                >
                  Cancelar Turno
                </StyledButton>
              </Grid>
            )}
            {row.original.shift_status === 2 && (
              <>
                <StyledButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEndTurn(row.original.turno_id)}
                  style={{ backgroundColor: 'green', margin: '5px' }}
                >
                  Finalizar Turno
                </StyledButton>
                <StyledButton
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUnassignTurn(row.original.turno_id)}
                >
                  Desasignar Turno
                </StyledButton>
              </>
            )}

            {row.original.shift_status === 3 && (
              <>
                <StyledButton
                  variant="contained"
                  style={{ backgroundColor: 'red', margin: '5px' }}
                >
                  Turno Cancelado
                </StyledButton>
              </>
            )}
          </>
        ),
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => turnosDisponibles || [],
    [turnosDisponibles],
  );

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
      <TableContainer>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <StyledTableCell {...column.getHeaderProps()}>
                    <StyledButton>{column.render('Header')}</StyledButton>
                  </StyledTableCell>
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
                      <StyledTableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </StyledTableCell>
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
