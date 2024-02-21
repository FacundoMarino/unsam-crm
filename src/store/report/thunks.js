import {
  getFormsReport,
  getServicesReport,
  getUsersReport,
} from '../../services/reportProvider';
import { errorApi } from '../auth/authSlider';

export const getServiceReport = ({ telekinesis, fecha_desde, fecha_hasta }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getServicesReport({
      telekinesis,
      token,
      fecha_desde,
      fecha_hasta,
    });

    data.error && errorApi(data.error);
  };
};

export const getFormReport = ({
  telekinesis,
  fecha_desde,
  fecha_hasta,
  form_id,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getFormsReport({
      telekinesis,
      token,
      fecha_desde,
      fecha_hasta,
      form_id,
    });

    data.error && errorApi(data.error);
  };
};

export const getUserReport = ({ telekinesis, fecha_desde, fecha_hasta }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await getUsersReport({
      telekinesis,
      token,
      fecha_desde,
      fecha_hasta,
    });

    data.error && errorApi(data.error);
  };
};
