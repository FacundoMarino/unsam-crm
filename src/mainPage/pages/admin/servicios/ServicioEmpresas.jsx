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
import { getServiciosByEnterprise } from '../../../../store/servicios/thunks';
import { setCrmPage } from '../../../../store/crm/crmSlider';
import { setIdEnterprise } from '../../../../store/servicios/servicesSlider';

export const ServicioEmpresas = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const enterprises = useSelector((state) => state.tasks.enterprises);

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
    dispatch(setCrmPage('bandejadesolicitudes'));
  };

  const columns = ['Empresa', 'Descipción', 'Domicilio', 'Acciones'];

  return (
    <>
      <Grid container></Grid>
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
            {enterprises?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row?.razon_social}</TableCell>
                <TableCell>{row?.description}</TableCell>
                <TableCell>{row?.address}</TableCell>

                <TableCell>
                  <Tooltip title="Ver Servicio Solicitado" arrow>
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() =>
                        handleModalOpen(
                          row.id,
                          row.razon_social,
                          row.address,
                          row.description,
                        )
                      }
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
