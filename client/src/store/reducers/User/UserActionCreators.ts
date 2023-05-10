import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store';
import { IUser } from '../../../types/modals/IUser';
import { userSlice } from '../User/UserSlice';
import $api from '../../../http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import UserService, { UpdateUser } from '../../../services/UserService';

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.useFetching());
//     const response = await $api.get<IUser>('/users/645901f9a088ecbb1141b0d7');
//     dispatch(userSlice.actions.useFetchingSuccess(response.data));
//   } catch (e: any) {
//     dispatch(userSlice.actions.useFetchingError(e.message));
//   }
// };

// export const updateUser = createAsyncThunk('user/fetch', async (_, thunkAPI) => {
//   try {
//     const response = await $api.get<IUser>('/users/645901f9a088ecbb1141b0d7');
//     return response.data;
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Нет польвателей');
//   }
// });
interface loginProps {
  email: string;
  password: string;
}

export const updateUser = createAsyncThunk(
  '/update',
  async (props: UpdateUser, thunkAPI) => {
    try {
      await UserService.update({ ...props });

      return;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не обновить обновить');
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

export const checkUser = createAsyncThunk('/check', async (_, thunkAPI) => {
  try {
    const response = await AuthService.check();
    console.log(response.data.username);
    return response.data.username;
  } catch (e: any) {
    console.log('false');
    return thunkAPI.rejectWithValue('Не удалось войти');
  }
});
