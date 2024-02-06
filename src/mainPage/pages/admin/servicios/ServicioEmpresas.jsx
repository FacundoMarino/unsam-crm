import React, { useEffect } from 'react';
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
import { getServicios } from '../../../../store/servicios/thunks';
import { setCrmPage } from '../../../../store/crm/crmSlider';

export const ServicioEmpresas = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const enterprises = useSelector((state) => state.tasks.enterprises);

  useEffect(() => {
    dispatch(getEnterprises({ telekinesis }));
  }, []);

  const handleModalOpen = (enterprise_id) => {
    dispatch(getServicios({ telekinesis, enterprise_id }));
    dispatch(setCrmPage('bandejadesolicitudes'));
  };

  const columns = ['Servicio', 'Empresas', 'Contacto', 'Acciones'];

  return (
    <>
      <Grid container></Grid>
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
            {enterprises?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row?.razon_social}</TableCell>
                <TableCell>{row?.email}</TableCell>

                <TableCell>
                  <Tooltip title="Ver Servicio Solicitado" arrow>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleModalOpen(row.id)}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
