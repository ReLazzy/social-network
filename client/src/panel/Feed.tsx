import React, { RefObject, useEffect, useRef, useState } from 'react';
import { PanelIDProps } from '../types/Panel';
import { Button, Group, Headline, Panel, Text, Title } from '@vkontakte/vkui';
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
import { useDispatch } from 'react-redux';
import { postSlice } from '../store/reducers/Post/PostSlice';
import { PANEL_FEED } from '../routes';
import { useObserver } from '../hooks/useObserver';

const Feed = (props: PanelIDProps) => {
  const { incrementPage } = postSlice.actions;
  const dispatch = useAppDispatch();
  const {
    postPage: pageCount,
    posts,
    isLoading,
    error,
    date,
  } = useAppSelector((state) => state.postReducer);
  const isEnd = false;
  const [postPage, setPostPage] = useState<number>(pageCount);
  const lastElement = useRef<HTMLDivElement>(null);
  const callback = () => dispatch(incrementPage(1));

  useObserver(lastElement, isLoading, callback, postPage * 5 <= posts.length);

  useEffect(() => {
    if (pageCount !== 0 && postPage === pageCount) return;
    dispatch(fetchPost({ username: '', page: pageCount, date: date }));
    setPostPage(pageCount);
  }, [pageCount]);

  return (
    <Panel id={PANEL_FEED}>
      <Navbar text="Новости" />
      <CreatePost></CreatePost>

      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}

      <div
        ref={lastElement}
        style={{
          height: '50px',
        }}
      ></div>

      {error && <Title>{error}</Title>}

      {isEnd && <Headline>Видимо это конец...</Headline>}
    </Panel>
  );
};

export default Feed;
