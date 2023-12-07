import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user_apellido: '',
    user_email: '',
    user_email_verified_at: null,
    user_enterprise: null,
    user_link_meet: null,
    user_name: '',
    user_rol: '',
    user_status: 1,
    user_step: 1,
    user_telephone: '',
    user_type_user: '',
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user_apellido = payload.user_apellido;
      state.user_email = payload.user_email;
      state.user_email_verified_at = payload.user_email_verified_at;
      state.user_enterprise = payload.user_enterprise;
      state.user_link_meet = payload.user_link_meet;
      state.user_name = payload.user_name;
      state.user_rol = payload.user_rol;
      state.user_status = payload.user_status;
      state.user_step = payload.user_step;
      state.user_telephone = payload.user_telephone;
      state.user_type_user = payload.user_type_user;
    },
    logout: (state, { payload }) => {
      state.status = 'checking';
      state.user_apellido = '';
      state.user_email = '';
      state.user_email_verified_at = null;
      state.user_enterprise = null;
      state.user_link_meet = null;
      state.user_name = '';
      state.user_rol = '';
      state.user_status = 1;
      state.user_step = 1;
      state.user_telephone = '';
      state.user_type_user = '';
    },
    registerStepOne: (state, { payload }) => {
      state.status = 'validate';
    },
    registerStepTwo: (state, { payload }) => {
      state.status = 'validateOk  ';
    },
  },
});

export const { login, logout, registerStepOne, registerStepTwo } =
  authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectUserStep = (state) => state.auth.user_step;
