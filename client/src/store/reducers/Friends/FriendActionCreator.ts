import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store';
import { IUser } from '../../../types/modals/IUser';
import { userSlice } from '../User/UserSlice';
import $api from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import FriendService from '../../../services/FriendsService';

export const fetchFrends = createAsyncThunk('/frends', async (_, thunkAPI) => {
  try {
    const response = await FriendService.friendsList();

    return response.data.friendslist;
  } catch (e: any) {
    return thunkAPI.rejectWithValue('Не удалось найти ваших друзей');
  }
});
