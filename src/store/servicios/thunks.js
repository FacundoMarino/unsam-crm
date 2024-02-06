import Swal from 'sweetalert2';
import { errorApi } from '../auth/authSlider';
import {
  deleteService,
  getServicies,
  getServiciesById,
  postServices,
  updateService,
} from '../../services/serviciosProvider';
import { setIndividualService, setServices, setStatus } from './servicesSlider';

export const createServices = ({ telekinesis, service, description }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postServices({
        telekinesis,
        token,
        service,
        description,
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
          text: 'El servicios se creó correctamente.',
        });
        dispatch(setStatus('ok'));
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

export const getServicios = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getServicies({
        telekinesis,
        token,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        errorApi(data.error);
      } else {
        dispatch(setServices(data));
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

export const getServiciosById = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getServiciesById({
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
        errorApi(data.error);
      } else {
        dispatch(setIndividualService(data.edit_shift));
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

export const updateServicio = ({ telekinesis, id, service, description }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await updateService({
        telekinesis,
        token,
        id,
        service,
        description,
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
          text: 'El servicios se actualizó correctamente.',
        });
        dispatch(setIndividualService([]));
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

export const eliminarServicio = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await deleteService({
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
        errorApi(data.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El servicios se eliminó correctamente.',
        });
        dispatch(setStatus('ok'));
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
