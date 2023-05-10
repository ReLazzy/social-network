import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FriendType,
  FriendsResponse,
} from '../../../types/modals/friendsResponse';
import { addPost, fetchPost, getPostUser, likePost } from './PostActionCreator';
import { ReseivedPostType } from '../../../types/Post';
import { AllData } from '../../../services/PostService';

interface PostsState {
  posts: ReseivedPostType[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: '',
};

export const postSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: {
    [getPostUser.pending.type](state) {
      state.isLoading = true;
    },
    [getPostUser.fulfilled.type](
      state,
      action: PayloadAction<ReseivedPostType[]>
    ) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [getPostUser.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

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

    [fetchPost.pending.type](state) {
      state.isLoading = true;
    },
    [fetchPost.fulfilled.type](
      state,
      action: PayloadAction<ReseivedPostType[]>
    ) {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [fetchPost.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [likePost.pending.type](state) {
      state.isLoading = true;
    },

    [likePost.fulfilled.type](state) {
      state.isLoading = false;
      state.error = '';
    },
    [likePost.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
