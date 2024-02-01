import { configureStore } from '@reduxjs/toolkit';
import { default as authReducer } from '../reducer/authSlice';
import { default as profileReducer } from '../reducer/profileSlice';

// Configuration d'un store Redux avec l'importation des reducteurs dans le store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: profileReducer,
  },
});

// Exportation du store pour être utilisé dans d'autres partie de l'application
export default store;
