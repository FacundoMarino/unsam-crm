import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getServicios,
  solicitarServicio,
} from '../../../store/servicios/thunks';
import { useEffect, useState } from 'react';

export const ServiciosExternal = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const entepriseId = useSelector(
    (state) => state.auth.enterprise.enterprise_id,
  );

  const [consultaGeneralId, setConsultaGeneralId] = useState('');

  const servicios = useSelector((state) => state.services.services);

  useEffect(() => {
    dispatch(getServicios({ telekinesis }));
  }, [dispatch, telekinesis]);

  useEffect(() => {
    if (servicios) {
      const filter = servicios.filter((e) => e.service === 'Consulta General');
      setConsultaGeneralId(filter);
    }
  }, [servicios]);

  const handleSubmit = (id) => {
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
      <Grid item xs={12}></Grid>
      {servicios?.map((servicio) => (
        <Grid item xs={6} md={6} textAlign="center" key={servicio.id}>
          {servicio.service !== 'Consulta General' && (
            <Card
              key={servicio.id}
              style={{ maxHeight: '300px', height: '100%' }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" mt={2}>
                  {servicio.service}
                </Typography>
                <Grid container style={{ height: '100px' }}>
                  <Typography color="textSecondary" mt={2} mb={2}>
                    {servicio.description}
                  </Typography>
                </Grid>
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#AC00E3' }}
                  onClick={() => handleSubmit(servicio.id)}
                >
                  Solicitar
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      ))}
      <Grid container spacing={2} mt={4} justifyContent={'center'}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleSubmit(consultaGeneralId[0].id)}
        >
          Solicitar turno Consulta General
        </Button>
      </Grid>
    </Grid>
  );
};
