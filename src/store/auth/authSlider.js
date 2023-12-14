import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    apellido: '',
    email: '',
    email_verified_at: null,
    enterprise: null,
    link_meet: null,
    name: '',
    rol: '',
    _status: 1,
    step: 1,
    telephone: '',
    type_user: '',
    telekinesis: '',
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.apellido = payload.info.user_apellido;
      state.email = payload.info.user_email;
      state.email_verified_at = payload.info.user_email_verified_at;
      state.enterprise = payload.info.user_enterprise;
      state.link_meet = payload.info.user_link_meet;
      state.name = payload.info.user_name;
      state.rol = payload.info.user_rol;
      state._status = payload.info.user_status;
      state.step = payload.info.user_step;
      state.telephone = payload.info.user_telephone;
      state.type_user = payload.info.user_type_user;
      state.telekinesis = payload.telekinesis;
    },
    logout: (state, { payload }) => {
      state.status = 'checking';
      state.apellido = '';
      state.email = '';
      state.email_verified_at = null;
      state.enterprise = null;
      state.link_meet = null;
      state.name = '';
      state.rol = '';
      state._status = 1;
      state.step = 1;
      state.telephone = '';
      state.type_user = '';
    },
    registerStepOne: (state, { payload }) => {
      state.status = 'validate';
    },
    registerStepTwo: (state, { payload }) => {
      state.status = 'validateOk';
    },
  },
});

export const { login, logout, registerStepOne, registerStepTwo } =
  authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectUserStep = (state) => state.auth.user_step;
