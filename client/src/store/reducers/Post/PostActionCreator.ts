import { createAsyncThunk } from '@reduxjs/toolkit';

import PostService, { usersPostsInfo } from '../../../services/PostService';
import { SendPostType } from '../../../components/CreatePost';
import { ReseivedPostType } from '../../../types/Post';

export interface fetchPostProps {
  username: string;
  page: number;
  date: number;
}

const SpreadPosts = (posts: ReseivedPostType[], users: usersPostsInfo[]) => {
  const allposts = posts.map((post) => {
    const user = users.find((user) => user._id === post.userId);
    if (user) {
      const { _id, ...other } = user!;
      return { ...other, ...post };
    }
  });
  return allposts;
};

export const addPost = createAsyncThunk(
  '/post',
  async (post: SendPostType, thunkAPI) => {
    try {
      const response = await PostService.addPost(post);
      const posts = response.data.allPost;
      const users = response.data.usersProfile;
      const allposts = SpreadPosts(posts, users);
      return allposts;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);

export const fetchPost = createAsyncThunk(
  '/fetchPost',
  async (props: fetchPostProps, thunkAPI) => {
    try {
      const response = await PostService.getFriendsPost(props.page, props.date);
      const posts = response.data.allPost;
      const users = response.data.usersProfile;
      const allposts = SpreadPosts(posts, users);
      return allposts;
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);
export const likePost = createAsyncThunk(
  '/likePost',
  async (idPanel: string, thunkAPI) => {
    try {
      const response = await PostService.likesPost(idPanel);

      return response.data;
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue('Не удалось оценить запись');
    }
  }
);

export const getPostUser = createAsyncThunk(
  '/usernamePost',
  async (props: fetchPostProps, thunkAPI) => {
    try {
      const { username, page, date } = props;
      const response = await PostService.getPostByUsername(
        username,
        page,
        date
      );
      const posts = response.data.allPost;
      const users = response.data.usersProfile;
      const usernanme = response.data.usernanme;
      const allPost = SpreadPosts(posts, users);
      return { allPost, usernanme };
    } catch (e: any) {
      return thunkAPI.rejectWithValue('Не удалось создать пост');
    }
  }
);
