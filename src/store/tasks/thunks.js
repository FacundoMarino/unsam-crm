import Swal from 'sweetalert2';
import {
  getEnterprisesProvider,
  getTaskProvider,
  postTask,
} from '../../services/tasksProvider';
import { errorApi } from '../auth/authSlider';
import {
  setEnterprises,
  setStatusTask,
  setTasks,
  setTasksEnterprises,
} from './taskSlider';

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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La solicitud se procesó correctamente.',
        });
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
