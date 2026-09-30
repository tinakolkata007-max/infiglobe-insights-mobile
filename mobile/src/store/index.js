import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import researchReducer from './slices/researchSlice';
import educationReducer from './slices/educationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    research: researchReducer,
    education: educationReducer,
  },
});

export default store;