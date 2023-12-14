import { createSlice } from '@reduxjs/toolkit';

export const crmSlice = createSlice({
  name: 'crm',
  initialState: {
    page: 'turnos',
  },
  reducers: {
    setCrmPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { setCrmPage } = crmSlice.actions;
