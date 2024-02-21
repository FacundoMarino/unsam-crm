import Swal from 'sweetalert2';
import {
  getAllServices,
  getEnterprisesProvider,
  getTaskProvider,
  postTask,
  updateTaskProvider,
} from '../../services/tasksProvider';
import { errorApi } from '../auth/authSlider';
import {
  setEnterprises,
  setStatusTask,
  setTasks,
  setTasksEnterprises,
} from './taskSlider';
import { setAllServices } from '../servicios/servicesSlider';

export const getEnterprises = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getEnterprisesProvider({ token, telekinesis });
    data.error
      ? errorApi(data.error)
      : dispatch(setEnterprises(data.enterprises));
  };
};

export const storeTasks = ({
  telekinesis,
  enterprise_id,
  tipo_tarea,
  status,
  comment,
  shift_type,
  form_id,
  service_id,
}) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('browser_token');
      const data = postTask({
        token,
        telekinesis,
        enterprise_id,
        tipo_tarea,
        status,
        comment,
        shift_type,
        form_id,
        service_id,
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
          text: 'La solicitud se procesó correctamente.',
        });
        dispatch(setStatusTask('ok'));
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

export const getTasks = ({ telekinesis, enterprise_id }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('browser_token');
      const data = await getTaskProvider({
        token,
        telekinesis,
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
        dispatch(setStatusTask('ok'));
        dispatch(setTasks(data.tareas));
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

export const updateTask = ({ telekinesis, enterprise_id, status, id }) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('browser_token');
      const data = await updateTaskProvider({
        token,
        telekinesis,
        enterprise_id,
        id,
        status,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        errorApi(data.error);
      } else {
        dispatch(setStatusTask('ok'));
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

export const getAllService = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getAllServices({ token, telekinesis });
    data.error
      ? errorApi(data.error)
      : dispatch(setAllServices(data.enterprises));
  };
};
