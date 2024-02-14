import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    status: '',
  },
  reducers: {
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setStatusNote: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setNotes, setStatusNote } = noteSlice.actions;
