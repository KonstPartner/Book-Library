import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '@/utils/fetchData';
import { REFRESH_ACCESS_TOKEN_URL } from '@/constants/apiSources';
import {
  AuthPayloadType,
  AuthStateType,
  RootStateType,
} from '@/types/ReduxTypes';
import fetchProfile from '@/utils/fetchProfile';

const initialState: AuthStateType = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  hasInitialized: false,
};

const refreshTokens = async (refreshToken: string) => {
  const response = await fetchData(REFRESH_ACCESS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.data) {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
  return null;
};

const initializeAuth = createAsyncThunk<
  AuthPayloadType,
  void,
  { rejectValue: string }
>('auth/initializeAuth', async (_, { rejectWithValue }) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!accessToken || !refreshToken) {
    return { user: null, accessToken: null, refreshToken: null };
  }

  try {
    const profile = await fetchProfile(accessToken, refreshToken);
    if (profile) return profile;

    const refreshed = await refreshTokens(refreshToken);
    if (!refreshed) throw new Error('Token refresh failed');

    const newProfile = await fetchProfile(
      refreshed.accessToken,
      refreshed.refreshToken
    );

    if (newProfile) return newProfile;

    throw new Error('Profile fetch failed after refresh');
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return rejectWithValue(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.hasInitialized = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.hasInitialized = true;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.hasInitialized = true;
        state.isAuthenticated = !!action.payload.user;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(initializeAuth.rejected, () => initialState);
  },
});

export { initializeAuth };

export const { setAuth, logout } = authSlice.actions;

export const selectAuth = (state: RootStateType) => state.auth;

export default authSlice.reducer;
