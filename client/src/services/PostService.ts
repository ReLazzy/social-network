import { AxiosResponse } from 'axios';
import $api from '../http';

import { FriendsResponse } from '../types/modals/friendsResponse';
import { SendPostType } from '../components/CreatePost';
import { ReseivedPostType } from '../types/Post';

export interface usersPostsInfo {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  profilePicture: string;
}
export interface AllData {
  allPost: ReseivedPostType[];
  usersProfile: usersPostsInfo[];
  usernanme?: string;
}

export default class PostService {
  static async addPost(post: SendPostType): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts', post);
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
    username: string,
    page: number,
    date: number
  ): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/timeline/person', {
      username: username,
      page: page,
      date: date,
    });
  }
  static async likesPost(postId: string): Promise<AxiosResponse<AllData>> {
    return $api.post<AllData>('/posts/like', { idPanel: postId });
  }
}
