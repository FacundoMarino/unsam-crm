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
  },
});

export const { setServices, setIndividualService, setStatus } =
  servicesSlice.actions;
