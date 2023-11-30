import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
  },
  reducers: {
    login: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { login } = authSlice.actions;

export const selectAuthStatus = (state) => state.auth.status;
