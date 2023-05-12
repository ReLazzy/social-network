import React, { useEffect, useState } from 'react';
import { PanelIDProps } from '../types/Panel';
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  ScreenSpinner,
  Title,
} from '@vkontakte/vkui';
import { Icon56NewsfeedOutline } from '@vkontakte/icons';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { useRouter } from '@happysanta/router';
import Navbar from '../components/Navbar';
// import { posts } from '../dummyData/Posts';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchPost } from '../store/reducers/Post/PostActionCreator';
import { ReseivedPostType } from '../types/Post';

const Feed = (props: PanelIDProps) => {
  const [limit, setLimit] = useState<number>(10);
  const [currentPosts, setCurrentPosts] = useState<ReseivedPostType[]>([]);
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPost(limit));
  }, []);
  useEffect(() => {
    setCurrentPosts(posts);
  }, [posts]);

  return (
    <Panel id={props.id}>
      <Navbar text="Новости" />
      <CreatePost update={fetchPost(limit)}></CreatePost>

      {error && <Title>{error}</Title>}
      {currentPosts &&
        currentPosts.map((post, x) => <Post key={post._id} {...post} />)}
      {isLoading && <ScreenSpinner state="loading" />}
    </Panel>
  );
};

export default Feed;
