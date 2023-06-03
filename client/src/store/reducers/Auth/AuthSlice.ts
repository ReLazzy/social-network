import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types/modals/IUser';
import {
  checkUser,
  followUser,
  loginUser,
  registerUser,
  unfollowUser,
} from './AuthActionCreators';
import { useRouter } from '@happysanta/router';
import {
  AuthResponse,
  followResponse,
} from '../../../types/modals/authResponse';

interface AuthState {
  id: string;
  username: string;
  isAuth: boolean;

  followings: string[];
  followers: string[];
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  id: '',
  username: '',

  followers: [],
  followings: [],
  isAuth: true,
  isLoading: false,
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [checkUser.pending.type](state) {
      state.isAuth = true;
    },
    [checkUser.fulfilled.type](state, action: PayloadAction<AuthResponse>) {
      if (action.payload.id !== state.id) state.id = action.payload.id;
      state.username = action.payload.username;

      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.error = '';
    },
    [checkUser.rejected.type](state) {
      state.isAuth = false;
    },

    [loginUser.pending.type](state) {
      state.isLoading = true;
    },
    [loginUser.fulfilled.type](state, action: PayloadAction<AuthResponse>) {
      state.username = action.payload.username;
      state.id = action.payload.id;

      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.isLoading = false;
      state.error = '';
      state.isAuth = true;
    },
    [loginUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [registerUser.pending.type](state) {
      state.isLoading = true;
    },
    [registerUser.fulfilled.type](state, action: PayloadAction<AuthResponse>) {
      state.id = action.payload.id;
      state.isLoading = false;
      state.username = action.payload.username;
      state.error = '';
      state.isAuth = true;
    },
    [registerUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [followUser.pending.type](state) {
      state.isLoading = true;
    },
    [followUser.fulfilled.type](state, action: PayloadAction<followResponse>) {
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.isLoading = false;
      state.error = '';
    },
    [followUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [unfollowUser.pending.type](state) {
      state.isLoading = true;
    },
    [unfollowUser.fulfilled.type](
      state,
      action: PayloadAction<followResponse>
    ) {
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.isLoading = false;
      state.error = '';
    },
    [unfollowUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
