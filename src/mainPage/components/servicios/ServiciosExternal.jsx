import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postServicios } from '../../../store/servicios/thunks';

export const ServiciosExternal = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const dispatch = useDispatch();
  const entepriseId = useSelector(
    (state) => state.auth.enterprise.enterprise_id,
  );

  const servicios = [
    {
      nombre: 'Capacitaciones in Company',
      descripcion: 'Descripción del servicio Capacitaciones in Company.',
    },
    {
      nombre: 'Asesorias o Consultorías técnicas',
      descripcion:
        'Descripción del servicio Asesorias o Consultorías técnicas.',
    },
    {
      nombre: 'Vinculación y Networking',
      descripcion: 'Descripción del servicio Vinculación y Networking.',
    },
    {
      nombre: 'Estudios Sectoriales',
      descripcion: 'Descripción del servicio Estudios Sectoriales.',
    },
    {
      nombre: 'Formulación de proyectos para Financiamento',
      descripcion:
        'Descripción del servicio Formulación de proyectos para Financiamento.',
    },
  ];

  const handleSubmit = (servicioNombre) => {
    /*dispatch(
      postServicios({
        telekinesis,
        enterprise_id: entepriseId,
        servicioNombre,
      }),
    );*/
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" textAlign="center">
          Solicitud de Servicios
        </Typography>
      </Grid>
      {servicios?.map((servicio, index) => (
        <Grid item xs={6} md={6} textAlign="center">
          <Card key={index}>
            <CardContent>
              <Typography variant="h5" component="h2" mt={2}>
                {servicio.nombre}
              </Typography>
              <Typography color="textSecondary" mt={2} mb={2}>
                {servicio.descripcion}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(servicio.nombre)}
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
