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
  username: string;
  isAuth: boolean;
  followers: string[];
  followings: string[];
  isLoading: boolean;
  error: string;
}

const initialState: AuthState = {
  username: '',
  followers: [],
  followings: [],
  isAuth: false,
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
      state.isLoading = false;
      state.username = action.payload.username;
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
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
    [registerUser.fulfilled.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.username = action.payload;
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
      state.isLoading = false;
      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.error = '';
      return state;
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
      state.isLoading = false;

      state.followers = action.payload.followers;
      state.followings = action.payload.followings;
      state.error = '';
      state.isAuth = true;
      return state;
    },
    [unfollowUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
