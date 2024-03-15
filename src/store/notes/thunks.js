import Swal from 'sweetalert2';
import { getNotes, postNotes } from '../../services/notesProvider';
import { errorApi } from '../auth/authSlider';
import { setNotes } from './noteSlider';

export const solicitarNotas = ({ telekinesis, service_id, enterprise_id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getNotes({
        telekinesis,
        token,
        service_id,
        enterprise_id,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        dispatch(errorApi(data.error));
      } else {
        dispatch(setNotes(data.notes));
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

export const newNote = ({
  telekinesis,
  service_id,
  enterprise_id,
  note,
  user_id,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postNotes({
        telekinesis,
        token,
        service_id,
        enterprise_id,
        note,
        user_id,
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
          text: 'La nota se creó correctamente.',
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
