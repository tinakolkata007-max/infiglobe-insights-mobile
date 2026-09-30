import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  intraDayReports: [],
  swingResearch: [],
  investmentResearch: [],
  modelPortfolio: [],
  selectedTab: 'intraday',
  loading: false,
  error: null,
};

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    setIntraDayReports: (state, action) => {
      state.intraDayReports = action.payload;
    },
    setSwingResearch: (state, action) => {
      state.swingResearch = action.payload;
    },
    setInvestmentResearch: (state, action) => {
      state.investmentResearch = action.payload;
    },
    setModelPortfolio: (state, action) => {
      state.modelPortfolio = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setIntraDayReports,
  setSwingResearch,
  setInvestmentResearch,
  setModelPortfolio,
  setSelectedTab,
  setLoading,
  setError,
} = researchSlice.actions;
export default researchSlice.reducer;