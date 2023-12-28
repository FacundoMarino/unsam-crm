import { createSlice } from '@reduxjs/toolkit';

export const shiftSlice = createSlice({
  name: 'shift',
  initialState: {
    status: 'stepOne',
    shiftType: [],
    hoursNotAvailable: [],
    quota: 0,
    shift_type_id: 0,
    daysNotAvailable: [{}],
    location: '',
    currentShift: [],
  },
  reducers: {
    setShiftType: (state, { payload }) => {
      state.shiftType = payload;
    },
    setShift: (state, { payload }) => {
      state.status = 'stepTwo';
      state.hoursNotAvailable = payload.hoursNotAvailable;
      state.quota = payload.quota;
      state.shift_type_id = payload.shift_type_id;
      state.daysNotAvailable = payload.daysNotAvailable;
      state.location = payload.location;
    },
    resetShift: (state) => {
      state.status = 'stepOne';
      state.hoursNotAvailable = [];
      state.quota = 0;
      state.shift_type_id = 0;
      state.daysNotAvailable = [{}];
      state.location = '';
    },
    setDayIsNotAvailable: (state, { payload }) => {
      state.status = 'stepTwo';
      state.daysNotAvailable = payload.daysNotAvailable;
    },
    setCurrentShift: (state, { payload }) => {
      state.currentShift = payload;
    },
  },
});

export const {
  setShiftType,
  setShift,
  resetShift,
  setDayIsNotAvailable,
  setCurrentShift,
} = shiftSlice.actions;
