import { createSlice } from '@reduxjs/toolkit';

export const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: '',
    individualService: [],
  },
  reducers: {
    setServices: (state, { payload }) => {
      state.services = payload;
    },
    setIndividualService: (state, { payload }) => {
      state.individualService = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setServicesByEnterprises: (state, { payload }) => {
      state.servicesByEnterprises = payload;
    },
    setIdEnterprise: (state, { payload }) => {
      state.idEnterprise = payload;
    },
    setIdService: (state, { payload }) => {
      state.idService = payload;
    },
    setAllServices: (state, { payload }) => {
      state.allServices = payload;
    },
  },
});

export const {
  setServices,
  setIndividualService,
  setStatus,
  setServicesByEnterprises,
  setIdEnterprise,
  setIdService,
  setAllServices,
} = servicesSlice.actions;
