import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: '',
  },
  reducers: {
    setTasks: (state, { payload }) => {
      state.form = payload;
    },
    setStatusTask: (state, { payload }) => {
      state.status = payload;
    },
  },
});

export const { setTasks, setStatusTask } = taskSlice.actions;
