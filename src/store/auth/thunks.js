import { getLogin, postLogin, postRegister } from '../../services/provider';
import { login } from './authSlider';

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

    dispatch(login(data));
  };
};
