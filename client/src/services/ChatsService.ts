import { AxiosResponse } from 'axios';
import $api from '../http';

export interface ChatsResponse {
  chats: string[];
}

export default class ChatsService {
  static async check(): Promise<AxiosResponse<ChatsResponse>> {
    return $api.post<ChatsResponse>('/chats/unreadChats');
  }
}
