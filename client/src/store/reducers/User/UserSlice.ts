import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types/modals/IUser';
import { UserType } from '../../../types/User';
import { ReseivedPostType } from '../../../types/Post';
import {
  getUserById,
  getUserByUsername,
  updateUserFunc,
} from './UserActionCreators';

interface UserState {
  user: UserType;
  posts: ReseivedPostType[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: {
    _id: '',
    name: '',
    lastname: '',
    birthday: '',
  },
  posts: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [updateUserFunc.pending.type](state) {
      state.isLoading = true;
    },
    [updateUserFunc.fulfilled.type](state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [updateUserFunc.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserByUsername.pending.type](state) {
      state.isLoading = true;
    },
    [getUserByUsername.fulfilled.type](state, action: PayloadAction<UserType>) {
      state.user = action.payload;

      state.isLoading = false;
      state.error = '';
    },
    [getUserByUsername.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getUserById.pending.type](state) {
      state.isLoading = true;
    },
    [getUserById.fulfilled.type](state, action: PayloadAction<UserType>) {
      state.user = action.payload;

      state.isLoading = false;
      state.error = '';
    },
    [getUserById.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
