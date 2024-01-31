import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'user',

  initialState: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
  },
  reducers: {
    setProfile: (state, action) => {
      state.firstName = action.payload.body.firstName;
      state.lastName = action.payload.body.lastName;
      state.userName = action.payload.body.userName;
      state.email = action.payload.body.email;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setProfile, updateUserName } = profileSlice.actions;
export default profileSlice.reducer;
