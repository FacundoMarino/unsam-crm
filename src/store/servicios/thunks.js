import Swal from 'sweetalert2';
import { errorApi } from '../auth/authSlider';
import { postServicies } from '../../services/serviciosProvider';
import { setServices } from './servicesSlider';

export const postServicios = ({ telekinesis, enterprise_id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postServicies({
        telekinesis,
        token,
        enterprise_id,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        errorApi(data.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La solicitud de servicios se procesó correctamente.',
        });
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

export const getServicios = ({ telekinesis, enterprise_id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postServicies({
        telekinesis,
        token,
        enterprise_id,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        errorApi(data.error);
      } else {
        dispatch(setServices(data.services));
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
