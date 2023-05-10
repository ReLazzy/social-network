import { createAsyncThunk } from '@reduxjs/toolkit';

import PostService from '../../../services/PostService';
import { SendPostType } from '../../../components/CreatePost';

export const addPost = createAsyncThunk(
  '/post',
  async (post: SendPostType, thunkAPI) => {
    try {
      const response = await PostService.addPost(post);
      return response;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);

export const fetchPost = createAsyncThunk(
  '/fetchPost',
  async (limit: number, thunkAPI) => {
    try {
      const response = await PostService.getFriendsPost(limit);

      return response.data.allPost;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);
export const likePost = createAsyncThunk(
  '/likePost',
  async (idPanel: string, thunkAPI) => {
    try {
      const response = await PostService.likesPost(idPanel);

      return response.data;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue('Не удалось оценить запись');
    }
  }
);
export const getPostUser = createAsyncThunk(
  '/usernamePost',
  async (username: string, thunkAPI) => {
    try {
      const response = await PostService.getPostByUsername(username);

      return response.data.allPost;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);
