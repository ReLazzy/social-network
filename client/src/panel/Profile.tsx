import { Icon28UserCircleOutline } from '@vkontakte/icons';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Placeholder,
  Gradient,
  CellButton,
  Button,
  Title,
  Avatar,
  Text,
  ScreenSpinner,
} from '@vkontakte/vkui';
import { PanelIDProps } from '../types/Panel';

import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
import Navbar from '../components/Navbar';

import { useLocation, useParams } from '@happysanta/router';
import { UserType } from '../types/User';
import { useEffect, useState } from 'react';
import Head from '../components/Head';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserByUsername } from '../store/reducers/User/UserActionCreators';
import { getPostUser } from '../store/reducers/Post/PostActionCreator';

const Profile = (props: PanelIDProps) => {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const {
    posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
  } = useAppSelector((state) => state.postReducer);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const params = location.getParams();
  const id = params.id;

  useEffect(() => {
    dispatch(getUserByUsername(id));
    dispatch(getPostUser(id));
  }, [id]);

  return (
    <Panel id={props.id}>
      <Navbar text="Профиль" />
      {error && <Title>{error}</Title>}
      {(isLoading || isLoadingPosts) && <ScreenSpinner state="loading" />}
      {user && !isLoading && (
        <div>
          <Head {...user}></Head>

          <CreatePost></CreatePost>
          {posts.map((post) => {
            if (true) return <Post key={post._id} {...post} />;
          })}
        </div>
      )}
    </Panel>
  );
};

export default Profile;
