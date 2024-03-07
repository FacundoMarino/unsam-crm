import { createSlice } from '@reduxjs/toolkit';

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: '',
    enterprises: [],
    tasksEnterprises: [],
  },
  reducers: {
    setTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    setStatusTask: (state, { payload }) => {
      state.status = payload;
    },
    setEnterprises: (state, { payload }) => {
      state.enterprises = payload;
    },
    setTasksEnterprises: (state, { payload }) => {
      state.tasksEnterprises = payload;
    },
    setTaskId: (state, { payload }) => {
      state.taskId = payload;
    },
    setEntepriseId: (state, { payload }) => {
      state.entepriseId = payload;
    },
    setFile: (state, { payload }) => {
      state.file = payload;
    },
  },
});

export const {
  setTasks,
  setStatusTask,
  setEnterprises,
  setTasksEnterprises,
  setTaskId,
  setEntepriseId,
  setFile,
} = taskSlice.actions;
