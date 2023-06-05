import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';

export default class UploadService {
  static async uploadImage(date: FormData): Promise<AxiosResponse> {
    return $api.post('/image/upload', date);
  }
  // static async deleteImage(imageUrl: string): Promise<AxiosResponse> {
  //   return $api.post('/image/delete', imageUrl);
  // }
}
