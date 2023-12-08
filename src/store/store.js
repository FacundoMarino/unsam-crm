import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlider';
import { crmSlice } from './crm/crmSlider';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crm: crmSlice.reducer,
  },
});
