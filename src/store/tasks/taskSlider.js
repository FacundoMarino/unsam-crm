import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: '',
    enterprises: [],
  },
  reducers: {
    setTasks: (state, { payload }) => {
      state.form = payload;
    },
    setStatusTask: (state, { payload }) => {
      state.status = payload;
    },
    setEnterprises: (state, { payload }) => {
      state.enterprises = payload;
    },
  },
});

export const { setTasks, setStatusTask, setEnterprises } = taskSlice.actions;
