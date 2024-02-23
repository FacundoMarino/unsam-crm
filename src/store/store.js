import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlider';
import { crmSlice } from './crm/crmSlider';
import { shiftSlice } from './shift/shiftSlider';
import { formSlice } from './forms/formSlider';
import { taskSlice } from './tasks/taskSlider';
import { servicesSlice } from './servicios/servicesSlider';
import { noteSlice } from './notes/noteSlider';
import { usersSlice } from './users/usersSlider';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    crm: crmSlice.reducer,
    shift: shiftSlice.reducer,
    forms: formSlice.reducer,
    tasks: taskSlice.reducer,
    services: servicesSlice.reducer,
    notes: noteSlice.reducer,
    users: usersSlice.reducer,
  },
});
