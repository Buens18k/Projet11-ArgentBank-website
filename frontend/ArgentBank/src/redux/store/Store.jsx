import { configureStore } from '@reduxjs/toolkit';
import { default as authReducer } from '../reducer/authSlice';
import { default as profileReducer } from '../reducer/profileSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: profileReducer,
  },
});

export default store;
