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
