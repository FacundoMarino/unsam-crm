import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlider';
import { crmSlice } from './crm/crmSlider';
import { shiftSlice } from './shift/shiftSlider';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crm: crmSlice.reducer,
    shift: shiftSlice.reducer,
  },
});
