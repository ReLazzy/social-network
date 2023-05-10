import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse } from '../types/modals/authResponse';
import { IUser } from '../types/modals/IUser';
import { UserType } from '../types/User';
export interface UpdateUser {
  password?: string;
  name?: string;
  lastname?: string;
  city?: string;
  profilePicture?: string;
  coverPicture?: string;
}
export default class UserService {
  static async update(props: UpdateUser): Promise<AxiosResponse<AuthResponse>> {
    return $api.put('/users/update', { ...props });
  }
  static async getByUserName(
    username: string
  ): Promise<AxiosResponse<UserType>> {
    return $api.post<UserType>('/users/username', { username: username });
  }

  //   static async registation(props: IUser): Promise<AxiosResponse<AuthResponse>> {
  //     return $api.post<AuthResponse>('/auth/register', { ...props });
  //   }
  //   static async check(): Promise<AxiosResponse<AuthResponse>> {
  //     return $api.post<AuthResponse>('/auth/check');
  //   }
}
