import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store';
import { IUser } from '../../../types/modals/IUser';
import { userSlice } from '../User/UserSlice';
import $api from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import FriendService from '../../../services/FriendsService';
import UploadService from '../../../services/UploadService';

export const uploadImage = createAsyncThunk(
  '/upload',
  async (image: FormData, thunkAPI) => {
    try {
      const response = await UploadService.uploadImage(image);

      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось загрузить фотографию');
    }
  }
);
