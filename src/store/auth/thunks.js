import {
  getEmailCode,
  getLogin,
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

  if (!token) {
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

export const startRegister = ({
  email,
  password,
  nombre,
  apellido,
  telefono,
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
  user,
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
      token,
      ...user,
    });
  };
};

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const sendEmailCode = (code, token, telekinesis) => {
  return async (dispatch) => {
    const data = await postSendEmailCode({
      code,
      token,
      telekinesis,
    });

    if (data) {
      dispatch(registerStepTwo());
    }
  };
};

export const reciveEmailCode = (token, telekinesis) => {
  return async (dispatch) => {
    const data = await getEmailCode({
      token,
      telekinesis,
    });

    if (data) {
      dispatch();
    }
  };
};
