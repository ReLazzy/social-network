import { AxiosResponse } from 'axios';
import $api from '../http';
import { AuthResponse, followResponse } from '../types/modals/authResponse';
import { IUser } from '../types/modals/IUser';
export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/login', { email, password });
  }
  static async registation(props: IUser): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/register', { ...props });
  }
  static async check(): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/auth/check');
  }
  static async follow(username: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/follow', { username });
  }
  static async unfollow(
    username: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/unfollow', { username });
  }
}
