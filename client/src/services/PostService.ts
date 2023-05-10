import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';
import { SendPostType } from '../components/CreatePost';

export default class PostService {
  static async addPost(post: SendPostType): Promise<AxiosResponse> {
    return $api.post('/posts', post);
  }
}
