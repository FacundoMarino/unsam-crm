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
    },
    resetShift: (state, { payload }) => {
      state.status = 'stepOne';
    },
  },
});

export const { setShiftType, setShift, resetShift } = shiftSlice.actions;
