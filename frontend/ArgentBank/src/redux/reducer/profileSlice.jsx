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
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
