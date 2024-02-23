import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: '',
  },
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },
    setStatusUser: (state, { payload }) => {
      state.status = payload;
    },
    setIndividualUser: (state, { payload }) => {
      state.individualUser = payload;
    },
  },
});

export const { setUsers, setStatusUser, setIndividualUser } =
  usersSlice.actions;
