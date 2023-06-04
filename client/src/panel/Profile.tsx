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
import { useEffect, useRef, useState } from 'react';
import Head from '../components/Head';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserByUsername } from '../store/reducers/User/UserActionCreators';
import { getPostUser } from '../store/reducers/Post/PostActionCreator';
import { ReseivedPostType } from '../types/Post';
import { VIEW_PROFILE } from '../routes';
import { postSlice } from '../store/reducers/Post/PostSlice';
import { useObserver } from '../hooks/useObserver';

const Profile = (props: PanelIDProps) => {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer
  );
  const { reset } = postSlice.actions;
  const [postPage, setPostPage] = useState<number>(0);
  const { username } = useAppSelector((state) => state.authReducer);
  const {
    ownerPosts,
    date,
    isLoading: isLoadingPosts,
    error: errorPosts,
  } = useAppSelector((state) => state.postReducer);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const params = location.getParams();
  const id = params.id;

  const lastElement = useRef<HTMLDivElement>(null);
  const callback = () => {
    setPostPage(postPage + 1);
  };

  useObserver(
    lastElement,
    isLoadingPosts || isLoading,
    callback,
    postPage * 5 <= ownerPosts.length
  );

  useEffect(() => {
    dispatch(getPostUser({ username: id, page: postPage, date: date }));
  }, [postPage]);

  useEffect(() => {
    dispatch(getUserByUsername(id));
    dispatch(reset());
    setPostPage(0);
  }, [id]);

  return (
    <Panel id={props.id}>
      <Navbar text="Профиль" />

      {error && <Title>{error}</Title>}
      {(isLoading || isLoadingPosts) && <ScreenSpinner state="loading" />}
      {user && !isLoading && (
        <div>
          <Head {...user}></Head>
          {username === id && <CreatePost></CreatePost>}
          {errorPosts && <Title>{errorPosts}</Title>}
          {ownerPosts.map((post) => {
            return <Post key={post._id} {...post} />;
          })}
          <div
            ref={lastElement}
            style={{
              height: '50px',
            }}
          ></div>
        </div>
      )}
    </Panel>
  );
};

export default Profile;
