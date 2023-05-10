import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store';
import { IUser } from '../../../types/modals/IUser';
import { userSlice } from '../User/UserSlice';
import $api from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import UserService, { UpdateUser } from '../../../services/UserService';

interface loginProps {
  email: string;
  password: string;
}

export const updateUserFunc = createAsyncThunk(
  '/update',
  async (props: UpdateUser, thunkAPI) => {
    try {
      await UserService.update({ ...props });

      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось обновить');
    }
  }
);

export const getUserByUsername = createAsyncThunk(
  '/username',
  async (username: string, thunkAPI) => {
    try {
      const response = await UserService.getByUserName(username);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const getUserById = createAsyncThunk(
  '/id',
  async (id: string, thunkAPI) => {
    try {
      const response = await UserService.getById(id);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
