import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FriendType,
  FriendsResponse,
} from '../../../types/modals/friendsResponse';
import { addPost } from './PostActionCreator';

interface UploadState {
  isLoading: boolean;
  error: string;
}

const initialState: UploadState = {
  isLoading: false,
  error: '',
};

export const postSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: {
    [addPost.pending.type](state) {
      state.isLoading = true;
    },
    [addPost.fulfilled.type](state) {
      state.isLoading = false;
      state.error = '';
    },
    [addPost.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
