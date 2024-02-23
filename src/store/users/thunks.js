import Swal from 'sweetalert2';
import { errorApi } from '../auth/authSlider';
import { setIndividualUser, setUsers } from './usersSlider';
import { createUser, viewUser } from '../../services/usersProvider';

export const crearUsuario = ({
  telekinesis,
  name,
  apellido,
  telephone,
  link_meet,
  type_user,
  rol,
  sub_rol,
  email,
  password,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await createUser({
        telekinesis,
        token,
        name,
        apellido,
        telephone,
        link_meet,
        type_user,
        rol,
        sub_rol,
        email,
        password,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        dispatch(errorApi(data.error));
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario se creó correctamente.',
        });
        dispatch(setUsers(data));
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al realizar la solicitud.',
      });
    }
  };
};

export const verUsuario = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await viewUser({
        telekinesis,
        token,
        id,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        dispatch(errorApi(data.error));
      } else {
        dispatch(setIndividualUser(data.user));
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al realizar la solicitud.',
      });
    }
  };
};
