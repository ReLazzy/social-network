import React, { useEffect, useState } from 'react';
import { PanelIDProps } from '../types/Panel';
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
} from '@vkontakte/vkui';
import { Icon56NewsfeedOutline } from '@vkontakte/icons';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';
import { useRouter } from '@happysanta/router';
import Navbar from '../components/Navbar';
// import { posts } from '../dummyData/Posts';
import axios from 'axios';

const Feed = (props: PanelIDProps) => {
  const [posts, setPosts] = useState();
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const res = await axios.get('posts/timeline/all');
  //     console.log(res);
  //   };
  //   fetchPosts();
  // }, []);
  return (
    <Panel id={props.id}>
      <Navbar text="Новости" />
      <CreatePost></CreatePost>
      {/* {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))} */}
    </Panel>
  );
};

export default Feed;
