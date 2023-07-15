import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FriendType,
  FriendsResponse,
} from '../../../types/modals/friendsResponse';
import { addPost, fetchPost, getPostUser, likePost } from './PostActionCreator';
import { ReseivedPostType } from '../../../types/Post';
import { AllData } from '../../../services/PostService';

interface PostsState {
  date: number;

  postsOwner: string;
  posts: ReseivedPostType[];
  ownerPosts: ReseivedPostType[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  date: +new Date(),

  postsOwner: '',
  ownerPosts: [],
  posts: [],
  isLoading: false,
  error: '',
};

export const postSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetAll(state) {
      state.date = +new Date();
      state.posts = [];

      state.isLoading = false;
      state.error = '';
    },
    reset(state) {
      state.ownerPosts = [];
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getPostUser.pending.type](state) {
      state.isLoading = true;
    },
    [getPostUser.fulfilled.type](state, action: PayloadAction<AllData>) {
      state.postsOwner = action.payload.usernanme || '';
      state.ownerPosts = [...state.ownerPosts, ...action.payload.allPost];
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
    [addPost.fulfilled.type](state, action: PayloadAction<ReseivedPostType[]>) {
    console.log(1)
      state.posts = [...action.payload, ...state.posts];
      state.ownerPosts = [...action.payload, ...state.ownerPosts];
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
      state.posts = [...state.posts, ...action.payload];
      console.log(state.posts);

      state.isLoading = false;
      state.error = '';
    },
    [fetchPost.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [likePost.pending.type](state) {},

    [likePost.fulfilled.type](state) {
      state.error = '';
    },
    [likePost.rejected.type](state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export default postSlice.reducer;
