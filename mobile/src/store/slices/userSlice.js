import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  email: null,
  phone: null,
  name: null,
  kycStatus: 'not_started',
  devices: [],
  subscriptions: [],
  language: 'en',
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const {id, email, phone, name, kycStatus, language} = action.payload;
      state.id = id;
      state.email = email;
      state.phone = phone;
      state.name = name;
      state.kycStatus = kycStatus || state.kycStatus;
      state.language = language || state.language;
    },
    setKYCStatus: (state, action) => {
      state.kycStatus = action.payload;
    },
    setSubscriptions: (state, action) => {
      state.subscriptions = action.payload;
    },
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {setUserData, setKYCStatus, setSubscriptions, setDevices, setLanguage} = userSlice.actions;
export default userSlice.reducer;