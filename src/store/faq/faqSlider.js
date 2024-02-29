import { createSlice } from '@reduxjs/toolkit';

export const faqSlice = createSlice({
  name: 'faq',
  initialState: {
    faqs: [],
    status: '',
  },
  reducers: {
    setFaqs: (state, { payload }) => {
      state.faqs = payload;
    },
    setStatusFaq: (state, { payload }) => {
      state.status = payload;
    },
    setIndividualFaq: (state, { payload }) => {
      state.faqIndividual = payload;
    },
  },
});

export const { setFaqs, setStatusFaq, setIndividualFaq } = faqSlice.actions;
