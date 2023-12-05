import {
  getLogin,
  postLogin,
  postRegister,
  postSendEmailCode,
} from '../../services/provider';
import { login, logout, registerStepOne, registerStepTwo } from './authSlider';

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
    dispatch(login(data));
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

    dispatch(registerStepOne(data));
  };
};

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const sendEmailCode = (code) => {
  return async (dispatch) => {
    const data = await postSendEmailCode({
      code,
    });

    if (data.error) {
      dispatch(registerStepTwo());
    }
  };
};
