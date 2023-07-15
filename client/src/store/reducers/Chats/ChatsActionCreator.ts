import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatsService from '../../../services/ChatsService';

export const checkChats = createAsyncThunk('/chats', async (_, thunkAPI) => {
  try {
    const response = await ChatsService.check();
    console.log(response.data)
    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue("нет чатов");
  }
});
