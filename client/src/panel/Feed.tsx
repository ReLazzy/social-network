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

const Feed = (props: PanelIDProps) => {
  const [limit, setLimit] = useState<number>(1);
  const { posts, isLoading, error } = useAppSelector(
    (state) => state.postReducer
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPost(limit));
  }, [limit]);
  return (
    <Panel id={props.id}>
      <Navbar text="Новости" />
      <CreatePost></CreatePost>

      {error && <Title>{error}</Title>}
      {posts && posts.map((post) => <Post key={post._id} {...post} />)}
      {isLoading && <ScreenSpinner state="loading" />}
      <div onScroll={() => setLimit(limit + 1)}></div>
    </Panel>
  );
};

export default Feed;
