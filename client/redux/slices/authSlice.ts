import { AuthStateType, RootStateType } from '@/types/ReduxTypes';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
});

export default authSlice.reducer;

export const { setAuth, logout } = authSlice.actions;

export const selectAuth = (state: RootStateType) => state.auth;