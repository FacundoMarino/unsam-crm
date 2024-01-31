import { createSlice } from '@reduxjs/toolkit';

export const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    status: '',
  },
  reducers: {
    setServices: (state, { payload }) => {
      state.services = payload;
    },
  },
});

export const { setServices } = servicesSlice.actions;
