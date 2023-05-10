import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';

export default class UserService {
  static async findFriends(
    serch: string
  ): Promise<AxiosResponse<FriendsResponse[]>> {
    return $api.post<FriendsResponse[]>('/users/search', serch);
  }
  static async friendsList(): Promise<AxiosResponse<FriendsResponse[]>> {
    return $api.post<FriendsResponse[]>('/users/friends');
  }
}
