import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServicios,
  solicitarServicio,
} from '../../../store/servicios/thunks';
import { useEffect } from 'react';

export const ServiciosExternal = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const entepriseId = useSelector(
    (state) => state.auth.enterprise.enterprise_id,
  );

  const servicios = useSelector((state) => state.services.services);

  useEffect(() => {
    dispatch(getServicios({ telekinesis }));
  }, [dispatch, telekinesis]);

  const handleSubmit = (id) => {
    console.log(id);

    dispatch(
      solicitarServicio({
        telekinesis,
        enterprise_id: entepriseId,
        servicio_id: id,
      }),
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" textAlign="center">
          Solicitud de Servicios
        </Typography>
      </Grid>
      {servicios?.map((servicio) => (
        <Grid item xs={6} md={6} textAlign="center" key={servicio.id}>
          <Card key={servicio.id}>
            <CardContent>
              <Typography variant="h5" component="h2" mt={2}>
                {servicio.service}
              </Typography>
              <Typography color="textSecondary" mt={2} mb={2}>
                {servicio.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(servicio.id)}
              >
                Solicitar
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
