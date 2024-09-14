import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isLoading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log("Login Start Action Dispatched");
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.error = false;
    },
    loginFailed: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    logout: (state) => {
      return initialState;
    },
    changeProfile: (state, action) => {
      state.currentUser.profilePicture = action.payload;
    },
    following: (state, action) => {
      const followingId = action.payload;
      const followingIndex = state.currentUser.following.findIndex(
        (followingArray) => followingArray[0] === followingId
      );

      if (followingIndex !== -1) {
        state.currentUser.following.splice(followingIndex, 1);
        console.log("Unfollow");
      } else {
        state.currentUser.following.push([followingId]);
        console.log("Follow");
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  changeProfile,
  following,
} = userSlice.actions;

export default userSlice.reducer;
