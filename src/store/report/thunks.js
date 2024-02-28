import {
  getFormsReport,
  getServicesReport,
  getUsersReport,
} from '../../services/reportProvider';
import { errorApi } from '../auth/authSlider';

export const getServiceReport = ({ telekinesis, fecha_desde, fecha_hasta }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getServicesReport({
        telekinesis,
        token,
        fecha_desde,
        fecha_hasta,
      });

      if (data && data.file) {
        downloadCSV(data.file);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

const downloadCSV = (csvData) => {
  csvData = csvData.replace(/,/g, ';');

  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reporte.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const getFormReport = ({
  telekinesis,
  fecha_desde,
  fecha_hasta,
  form_id,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getFormsReport({
        telekinesis,
        token,
        fecha_desde,
        fecha_hasta,
        form_id,
      });

      if (data && data.file) {
        downloadCSV(data.file);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

export const getUserReport = ({ telekinesis, fecha_desde, fecha_hasta }) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    try {
      const data = await getUsersReport({
        telekinesis,
        token,
        fecha_desde,
        fecha_hasta,
      });

      if (data && data.file) {
        downloadCSV(data.file);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};
