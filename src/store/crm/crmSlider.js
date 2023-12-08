import { createSlice } from '@reduxjs/toolkit';

export const crmSlice = createSlice({
  name: 'crm',
  initialState: {
    page: '',
  },
  reducers: {
    setCrmPage: (state, { payload }) => {
      state.page = payload;
    },
  },
});

export const { setCrmPage } = crmSlice.actions;
