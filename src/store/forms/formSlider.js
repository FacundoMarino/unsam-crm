import { createSlice } from '@reduxjs/toolkit';

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    form: [],
    status: '',
  },
  reducers: {
    setForm: (state, { payload }) => {
      state.form = payload;
    },
    setStatusForm: (state, { payload }) => {
      state.status = payload;
    },
    setFormId: (state, { payload }) => {
      state.formId = payload;
    },
    setIndividualForm: (state, { payload }) => {
      state.individualForm = payload;
    },
    setFormIdCreate: (state, { payload }) => {
      state.formIdCreate = payload;
    },
  },
});

export const {
  setForm,
  setStatusForm,
  setFormId,
  setIndividualForm,
  setFormIdCreate,
} = formSlice.actions;
