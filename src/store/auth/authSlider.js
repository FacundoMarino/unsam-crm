import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user_id: 0,
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
    errorMessage: null,
    user_enterprise: {
      enterprise_address: '',
      enterprise_branch_offices: 0,
      enterprise_category: '',
      enterprise_cuit: 0,
      enterprise_description: '',
      enterprise_employees: 0,
      enterprise_name: '',
    },
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
      state.errorMessage = null;
      state.user_enterprise = payload.user_enterprise;
      state.user_id = payload.info.user_id;
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
      state.errorMessage = null;
    },
    registerStepOne: (state, { payload }) => {
      state.status = 'validate';
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
      state.errorMessage = null;
    },
    registerStepTwo: (state, { payload }) => {
      state.status = 'validateOk';
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
      state.errorMessage = null;
    },
    registerStepThree: (state, { payload }) => {
      state.status = 'registerTwo';
    },
    errorApi: (state, { payload }) => {
      state.errorMessage = payload.error;
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
    setEnterpriseId: (state, { payload }) => {
      state.enterprise_id = payload;
    },
  },
});

export const {
  login,
  logout,
  registerStepOne,
  registerStepTwo,
  errorApi,
  registerStepThree,
  setEnterpriseId,
} = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
export const selectUserStep = (state) => state.auth.user_step;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectRole = (state) => state.auth.rol;
