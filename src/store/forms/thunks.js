import Swal from 'sweetalert2';
import {
  deleteForm,
  getFormId,
  getForms,
  newForm,
  postComponentForm,
  putForm,
  responseForm,
} from '../../services/formsProvider';
import { errorApi } from '../auth/authSlider';
import {
  setForm,
  setFormId,
  setFormIdCreate,
  setIndividualForm,
  setMaxStep,
  setStatusForm,
} from './formSlider';

export const getAllForms = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getForms({
      telekinesis,
      token,
    });

    data.error ? errorApi(data.error) : dispatch(setForm(data));
  };
};

export const postNewForm = ({ telekinesis, name }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await newForm({
        telekinesis,
        token,
        name,
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
        dispatch(setStatusForm('ok'));
        dispatch(setFormIdCreate(data.form_new.id));
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

export const deleteFormId = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await deleteForm({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el formulario.',
        });
        errorApi(data.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El formulario se eliminó correctamente.',
        });
        dispatch(setStatusForm('ok'));
      }
    } catch (error) {
      console.error('Error al eliminar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el formulario.',
      });
    }
  };
};

export const addQuestionForm = ({ telekinesis, form_id, data }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const resp = await postComponentForm({
        token,
        telekinesis,
        form_id,
        data,
      });
      if (resp.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al guardar la pregunta.',
        });
        errorApi(resp.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La pregunta se guardo correctamente.',
        });
        dispatch(setStatusForm('ok'));
        dispatch(setFormIdCreate(''));
      }
    } catch (error) {
      console.error('Error al guardar la pregunta:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el formulario.',
      });
    }
  };
};

export const getFormFromId = ({ telekinesis, form_id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getFormId({ token, telekinesis, form_id });
    data.error
      ? errorApi(data.error)
      : dispatch(setIndividualForm([...Object.values(data.form_components)]));
    dispatch(setMaxStep(data.max_step));
  };
};

export const updateQuestionForm = ({ telekinesis, form_id, data }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const resp = await putForm({
        token,
        telekinesis,
        form_id,
        data,
      });
      if (resp.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el formulario',
        });
        errorApi(resp.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El formulario se actualizó correctamente.',
        });
        dispatch(setStatusForm('ok'));
        dispatch(setFormIdCreate(''));
      }
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el formulario.',
      });
    }
  };
};

export const responseQuestionForm = ({ telekinesis, form_id, data }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const resp = await responseForm({
        token,
        telekinesis,
        form_id,
        data,
      });
      if (resp.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el formulario',
        });
        errorApi(resp.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El formulario se actualizó correctamente.',
        });
        dispatch(setStatusForm('ok'));
        dispatch(setFormIdCreate(''));
      }
    } catch (error) {
      console.error('Error al guardar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el formulario.',
      });
    }
  };
};
