import {
  assignShift,
  cancelShift,
  deleteShiftProvider,
  endShift,
  getAllShiftsTakes,
  getShiftEdit,
  postShiftStepTWo,
  postShiftUpdate,
  postShiftsTypes,
  postShiftsTypesOne,
  postShiftsTypesServices,
  postStore,
  unassignShift,
} from '../../services/shiftProvider';
import { errorApi } from '../auth/authSlider';
import {
  resetShift,
  setAdminStatus,
  setCurrentShift,
  setDayIsNotAvailable,
  setShift,
  setShiftType,
  setShiftsTakes,
} from './shiftSlider';

import Swal from 'sweetalert2';

export const getShiftsTypes = ({ telekinesis }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postShiftsTypes({
      telekinesis,
      token,
    });

    data.error ? errorApi(data.error) : dispatch(setShiftType(data));
  };
};

export const getDaysNotAvailable = ({ telekinesis, shift_type, location }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postShiftsTypesOne({
      telekinesis,
      token,
      location,
      shift_type,
    });

    data.error ? errorApi(data.error) : dispatch(setDayIsNotAvailable(data));
  };
};

export const postShiftStepTwo = ({
  location,
  shift_type,
  telekinesis,
  day,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postShiftStepTWo({
      location,
      shift_type,
      telekinesis,
      token,
      day,
    });

    data.error ? errorApi(data.error) : dispatch(setShift(data));
  };
};

export const postStoreShift = ({
  location,
  shift_type,
  telekinesis,
  day,
  hour,
  shift_type_id,
  service_id,
  tarea_id,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postStore({
        location,
        shift_type,
        telekinesis,
        token,
        day,
        hour,
        shift_type_id,
        service_id,
        tarea_id,
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
        dispatch(resetShift());
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

export const postShiftType = ({
  telekinesis,
  name,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  start_time,
  end_time,
  shift_type,
  virtual_appointments_duration,
  virtual_quota,
  in_person_appointments_duration,
  in_person_quota,
  user_id,
  in_admin_inbox,
  in_admission_inbox,
  in_consultancy_inbox,
}) => {
  const token = localStorage.getItem('browser_token');

  return async (dispatch) => {
    try {
      const data = await postShiftsTypesServices({
        token,
        telekinesis,
        name,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        start_time,
        end_time,
        shift_type,
        virtual_appointments_duration,
        virtual_quota,
        in_person_appointments_duration,
        in_person_quota,
        user_id,
        in_admin_inbox,
        in_admission_inbox,
        in_consultancy_inbox,
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
        dispatch(setAdminStatus('ok'));
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

export const getShiftId = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getShiftEdit({ token, telekinesis, id });
    data.error ? errorApi(data.error) : dispatch(setCurrentShift(data));
  };
};

export const updateShift = ({
  telekinesis,
  id,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
  start_time,
  end_time,
  shift_type,
  virtual_appointments_duration,
  virtual_quota,
  in_person_appointments_duration,
  in_person_quota,
  user_id,
  in_admin_inbox,
  in_admission_inbox,
  in_consultancy_inbox,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await postShiftUpdate({
        token,
        telekinesis,
        id,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
        start_time,
        end_time,
        shift_type,
        virtual_appointments_duration,
        virtual_quota,
        in_person_appointments_duration,
        in_person_quota,
        user_id,
        in_admin_inbox,
        in_admission_inbox,
        in_consultancy_inbox,
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
          title: 'Exito',
          text: 'La solicitud se procesó correctamente.',
        });
        dispatch(setAdminStatus('ok'));
      }
    } catch (error) {
      console.error('Error al eliminar el turno::', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al realizar la solicitud.',
      });
    }
  };
};

export const deleteShift = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await deleteShiftProvider({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El turno se eliminó correctamente.',
        });
        dispatch(setAdminStatus('ok'));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};

export const verTodosLosTurnosTomados = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getAllShiftsTakes({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        dispatch(setShiftsTakes(data.shift_in_box));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};

export const asignarTurno = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await assignShift({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        dispatch(setShiftsTakes(data.shift_in_box));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};

export const cancelarTurno = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await cancelShift({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        dispatch(setShiftsTakes(data.shift_in_box));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};

export const desasignarTurno = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await unassignShift({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        dispatch(setShiftsTakes(data.shift_in_box));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};

export const finalizarTurno = ({ telekinesis, id }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await endShift({ token, telekinesis, id });
      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al eliminar el turno.',
        });
        errorApi(data.error);
      } else {
        dispatch(setShiftsTakes(data.shift_in_box));
      }
    } catch (error) {
      console.error('Error al eliminar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al eliminar el turno.',
      });
    }
  };
};
