import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';
import { SendPostType } from '../components/CreatePost';
import { ReseivedPostType } from '../types/Post';
export interface AllData {
  allPost: ReseivedPostType[];
  usernanme?: string;
}

export default class PostService {
  static async addPost(
    post: SendPostType
  ): Promise<AxiosResponse<ReseivedPostType>> {
    return $api.post<ReseivedPostType>('/posts', post);
  }
  static async getFriendsPost(
    page: number,
    date: number
  ): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/timeline/all', {
      page: page,
      date: date,
    });
  }
  static async getPostByUsername(
    username: string
  ): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/timeline/person', {
      username: username,
    });
  }
  static async likesPost(postId: string): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/like', { idPanel: postId });
  }
}
