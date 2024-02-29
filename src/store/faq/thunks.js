import Swal from 'sweetalert2';
import { errorApi } from '../auth/authSlider';
import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  viewAllQuestion,
  viewQuestion,
} from '../../services/faqProvider';
import { setFaqs, setIndividualFaq } from './faqSlider';

export const crearPregunta = ({ telekinesis, question, response }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await createQuestion({
        telekinesis,
        token,
        question,
        response,
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
          text: 'La pregunta se creó correctamente.',
        });
        dispatch(setFaqs(data.question_responses));
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

export const actualizarPregunta = ({ telekinesis, question, response, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await updateQuestion({
        telekinesis,
        token,
        question,
        response,
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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La pregunta se actualizó correctamente.',
        });
        dispatch(setFaqs(data.questions_responses));
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

export const verPregunta = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await viewQuestion({
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
        dispatch(setIndividualFaq(data.question_response));
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

export const borrarPregunta = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await deleteQuestion({
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
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El pregunta se creó correctamente.',
        });
        dispatch(setFaqs(data.questions_responses));
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

export const verTodasPreguntas = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await viewAllQuestion({
        telekinesis,
        token,
      });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar la solicitud.',
        });
        dispatch(errorApi(data.error));
      } else {
        dispatch(setFaqs(data.questions_responses));
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
