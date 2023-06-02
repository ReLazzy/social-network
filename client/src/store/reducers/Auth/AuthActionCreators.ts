import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store';
import { IUser } from '../../../types/modals/IUser';
import { userSlice } from '../User/UserSlice';
import $api from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';

interface loginProps {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  '/login',
  async (props: loginProps, thunkAPI) => {
    try {
      const response = await AuthService.login(props.email, props.password);
      await localStorage.setItem('token', response.data.token);

      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось войти');
    }
  }
);

export const registerUser = createAsyncThunk(
  '/register',
  async (props: IUser, thunkAPI) => {
    try {
      const response = await AuthService.registation(props);
      localStorage.setItem('token', response.data.token);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const checkUser = createAsyncThunk('/check', async (_, thunkAPI) => {
  try {
    const response = await AuthService.check();

    return response.data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue('Не удалось войти');
  }
});

export const followUser = createAsyncThunk(
  '/follow',
  async (username: string, thunkAPI) => {
    try {
      const response = await AuthService.follow(username);
      console.log('resp folw', response.data);

      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось подписаться');
    }
  }
);
export const unfollowUser = createAsyncThunk(
  '/unfollow',
  async (username: string, thunkAPI) => {
    try {
      const response = await AuthService.unfollow(username);
      console.log('resp unf', response.data);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось отписаться');
    }
  }
);
