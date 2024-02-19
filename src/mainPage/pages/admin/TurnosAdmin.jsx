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
import { useSelect } from '@mui/base';

const StyledTableCell = styled(TableCell)({
  padding: '10px',
  fontSize: '12px',
});

const StyledButton = styled(Button)({
  fontSize: '12px',
});

const turnosDisponibles = [
  {
    id: 1,
    nombre: 'Juan Perez',
    modalidad: 'Presencial',
    tipo: 'Consulta',
    fecha: '2022-01-01',
    dia: 'Lunes',
    horaInicio: '10:00',
    horaFinal: '11:00',
    estado: 'Sin Asignar',
    servicio: '-',
  },
  {
    id: 2,
    nombre: 'Jose Gonzalez',
    modalidad: 'Presencial',
    tipo: 'Admisión',
    fecha: '2021-01-02',
    dia: 'Martes',
    horaInicio: '10:00',
    horaFinal: '11:00',
    estado: 'Asignado',
    servicio: '-',
  },
  {
    id: 3,
    nombre: 'Roberto Rojas',
    modalidad: 'Virtual',
    tipo: 'Asistencia',
    fecha: '2023-12-21',
    dia: 'Miércoles',
    horaInicio: '08:00',
    horaFinal: '08:30',
    estado: 'Sin Asignar',
    servicio: '-',
  },
];
export const TurnosDisponibles = ({ setDisplayCreateShift }) => {
  useEffect(() => {
    setDisplayCreateShift('none');
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nombre',
        accessor: 'nombre',
      },
      {
        Header: 'Tipo de Turno',
        accessor: 'tipo',
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
        accessor: 'fecha',
      },
      {
        Header: 'Hora',
        accessor: (row) => `${row.horaInicio} - ${row.horaFinal}`,
      },
      {
        Header: 'Estado',
        accessor: 'estado',
      },
      {
        Header: 'Acciones',
        Cell: ({ row }) => (
          <>
            {row.original.estado !== 'Asignado' && (
              <>
                <StyledButton
                  variant="contained"
                  color="primary"
                  style={{ margin: '5px' }}
                >
                  Tomar Turno
                </StyledButton>
                <StyledButton variant="contained" color="secondary">
                  Cancelar Turno
                </StyledButton>
              </>
            )}
            {row.original.estado === 'Asignado' && (
              <>
                <StyledButton variant="contained" color="secondary">
                  Desasignar Turno
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
