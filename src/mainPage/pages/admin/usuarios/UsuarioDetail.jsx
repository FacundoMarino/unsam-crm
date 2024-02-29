import {
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEnterprises } from '../../../../store/tasks/thunks';
import { setIndividualUser } from '../../../../store/users/usersSlider';

export const UsuarioDetail = () => {
  const telekinesis = useSelector((state) => state.auth.telekinesis);
  const enterprises = useSelector((state) => state.tasks.enterprises);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.individualUser);
  const [userIndividual, setUserIndividual] = useState([]);
  const [enterprise, setEnterprise] = useState([]);

  useEffect(() => {
    user && setUserIndividual(user);
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(setIndividualUser([]));
    };
  }, []);

  useEffect(() => {
    dispatch(getEnterprises({ telekinesis }));
  }, []);

  useEffect(() => {
    setEnterprise(
      enterprises.find(
        (enterpriseR) => enterpriseR.id === userIndividual.enterprise_id,
      ),
    );
  }, [enterprises]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardContent>
            <Avatar src={userIndividual.profile_photo_url} size="xl" />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Nombre:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.apellido}, {userIndividual.name}
                </Typography>
              </Grid>
            </Grid>

            <Divider />

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Empresa:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {enterprise?.razon_social || '-'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Dirección:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {enterprise?.address || '-'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Email:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.email || '-'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Teléfono:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.telephone || '-'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Tipo de Usuario:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.type_user || '-'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Rol:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.rol === 1 ? 'Admin' : 'Externo'}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Sub-Rol:
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  {userIndividual.sub_rol || '-'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
