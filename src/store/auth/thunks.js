import {
  getEmailCode,
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  postRegisterStepTwo,
  postSendEmailCode,
} from '../../services/provider';
import {
  errorApi,
  login,
  logout,
  registerStepOne,
  registerStepTwo,
} from './authSlider';

export const checkAuth = () => {
  const token = localStorage.getItem('browser_token');

  if (!token || token === 'undefined') {
    getLogin();
  }
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  const token = localStorage.getItem('browser_token');

  return async (dispatch) => {
    const data = await postLogin({
      email,
      password,
      token,
    });

    data.error ? dispatch(errorApi(data)) : dispatch(login(data));
  };
};

export const getRegisterThunk = () => {
  return async () => {
    const data = await getRegister();
    localStorage.setItem('browser_token', data.browser_token);
  };
};
export const startRegister = ({
  email,
  password,
  nombre,
  apellido,
  telefono,
  telekinesis,
}) => {
  const token = localStorage.getItem('browser_token');

  return async (dispatch) => {
    const data = await postRegister({
      email,
      password,
      nombre,
      apellido,
      telefono,
      token,
      telekinesis,
    });

    data.error ? dispatch(errorApi(data)) : dispatch(registerStepOne(data));
  };
};

export const startRegisterStepTwo = ({
  cuit,
  direccion,
  descripcion,
  empleados,
  sucursales,
  rubro,
  telekinesis,
  razon_social,
}) => {
  const token = localStorage.getItem('browser_token');
  return async (dispatch) => {
    const data = await postRegisterStepTwo({
      cuit,
      direccion,
      descripcion,
      empleados,
      sucursales,
      rubro,
      telekinesis,
      token,
      razon_social,
    });

    if (!data.error) {
      dispatch(login(data));
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const sendEmailCode = ({ code }, token, telekinesis) => {
  return async (dispatch) => {
    const data = await postSendEmailCode({
      code,
      token,
      telekinesis,
    });

    if (data) {
      dispatch(registerStepTwo(data));
    }
  };
};

export const reciveEmailCode = (token, telekinesis) => {
  return async (dispatch) => {
    const data = await getEmailCode({
      token,
      telekinesis,
    });

    if (!data.error) {
      dispatch(registerStepOne(data));
    }
  };
};
