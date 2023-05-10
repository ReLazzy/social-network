import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';
import { SendPostType } from '../components/CreatePost';
import { ReseivedPostType } from '../types/Post';
export interface AllData {
  allPost: ReseivedPostType[];
}

export default class PostService {
  static async addPost(post: SendPostType): Promise<AxiosResponse> {
    return $api.post('/posts', post);
  }
  static async getFriendsPost(limit: number): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/timeline/all', limit);
  }
  static async getPostByUsername(
    username: string
  ): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/timeline/person', username);
  }
  static async likesPost(postId: string): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/like', { idPanel: postId });
  }
}
