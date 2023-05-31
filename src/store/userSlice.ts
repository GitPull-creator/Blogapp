import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { AuthDataRegistrationType, LoginDataType, UpdateProfileDataType } from '../components/types/types';

const baseURL = 'https://blog.kata.academy/api/';
export const fetchRegistration = createAsyncThunk(
  'user/fetchRegistration',
  async (authData: AuthDataRegistrationType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}users`,
        {
          user: authData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(Object.entries(error?.response?.data.errors)[0][0]);
    }
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async (token: string) => {
  const response = await axios.get(`${baseURL}user`, {
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const fetchLogin = createAsyncThunk('user/fetchLogin', async (loginData: LoginDataType, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${baseURL}users/login`,
      {
        user: loginData,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(Object.entries(error?.response?.data.errors)[0][0]);
      return rejectWithValue(Object.entries(error?.response?.data.errors)[0][0]);
    }
  }
});

export const fetchUpdateProfile = createAsyncThunk(
  'user/fetchUpdateProfile',
  async (authData: UpdateProfileDataType, { rejectWithValue }) => {
    const { token, ...rest } = authData;
    try {
      const response = await axios.put(
        `${baseURL}user`,
        {
          user: rest,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(Object.entries(error?.response?.data.errors)[0][0]);
    }
  }
);

interface initialStateType {
  user: {
    email: string;
    password: string;
    username: string;
    image?: string;
    token: string;
  };
  isLoggedIn: boolean;
  userLoading: boolean;
  error: string;
}

const initialState: initialStateType = {
  user: {
    email: '',
    password: '',
    username: '',
    image: '',
    token: '',
  },
  isLoggedIn: false,
  userLoading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setsIsLoggedIn(state) {
      state.isLoggedIn = true;
    },
    setsIsLoggedOut(state) {
      state.isLoggedIn = false;
    },
    removeError(state) {
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.error = 'none';
      })
      .addCase(fetchRegistration.rejected, (state, action: PayloadAction<unknown>) => {
        if (typeof action.payload === 'string') state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userLoading = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = 'none';
      })
      .addCase(fetchLogin.rejected, (state, action: PayloadAction<unknown>) => {
        if (typeof action.payload === 'string') state.error = action.payload;
      })
      .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = 'none';
      })
      .addCase(fetchUpdateProfile.rejected, (state, action: PayloadAction<unknown>) => {
        if (typeof action.payload === 'string') state.error = action.payload;
      });
  },
});

export const { setsIsLoggedIn, setsIsLoggedOut, removeError } = userSlice.actions;
export default userSlice.reducer;
