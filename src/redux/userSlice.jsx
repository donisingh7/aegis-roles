
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userData",
  initialState: {
    users: []
  },
  reducers: {
    addUsers: (state, action) => {
      state.users.push(...action.payload);
    },
    togglePassword: (state, action) => {
      const index = action.payload;
      if (state.users[index]) {
        state.users[index].showPassword = !state.users[index].showPassword;
      }
    }
  }
});

export const { addUsers, togglePassword } = userSlice.actions;
export default userSlice.reducer;
