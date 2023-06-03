import {
  Icon28EditOutline,
  Icon28Like,
  Icon28LikeFillRed,
  Icon28LikeOutline,
  Icon28ShareOutline,
} from '@vkontakte/icons';

import {
  Avatar,
  Card,
  CardGrid,
  Counter,
  Group,
  Headline,
  ScreenSpinner,
  Subhead,
  Text,
  Title,
} from '@vkontakte/vkui';

import style from './Post.module.css';

import { useRouter } from '@happysanta/router';

import { ReseivedPostType } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { likePost } from '../store/reducers/Post/PostActionCreator';
import { useEffect, useState } from 'react';
import { PAGE_PROFILE } from '../routes';
import { format } from 'timeago.js';
import UserService from '../services/UserService';
import { UserType } from '../types/User';
import { getUserByUsername } from '../store/reducers/User/UserActionCreators';
import { PF } from '../constants';

const Post = (props: ReseivedPostType) => {
  const router = useRouter();

  const { id } = useAppSelector((state) => state.authReducer);

  const [like, setLike] = useState(props.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(props.likes.includes(id));

  const {
    user: currUser,
    isLoading,
    error,
  } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  // getUser(props.username);
  // getUser(props.username);
  const likeHandler = () => {
    const postId: string = props._id;
    dispatch(likePost(postId));

    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <Group>
      {isLoading && <ScreenSpinner state="loading" />}
      {error && <Title>{error}</Title>}
      {props && (
        <div className={style.container}>
          <div
            className={style.author}
            onClick={() =>
              router.pushPage(PAGE_PROFILE, { id: props.username })
            }
          >
            <Avatar
              src={
                props.profilePicture
                  ? PF + props.profilePicture
                  : PF + 'avatar.png'
              }
            />
            <div>
              <Headline weight="2">
                {props.name} {props.lastname}
              </Headline>
              <Subhead weight="3">{format(props.createdAt)}</Subhead>
            </div>
          </div>
          <Text>{props.desc}</Text>
          {props.image && (
            <div className={style.image}>
              <img src={PF + props.image} alt="image" />
            </div>
          )}
          <div className={style.bottomSide}>
            <div className={style.reaction}>
              {like !== 0 ? (
                <Counter mode={isLiked ? 'prominent' : 'secondary'}>
                  {like}
                </Counter>
              ) : (
                ''
              )}

              <div onClick={likeHandler}>
                {isLiked ? <Icon28LikeFillRed /> : <Icon28LikeOutline />}
              </div>
              {/* <Icon28ShareOutline
                onClick={() => console.log(props.username, currUser)}    Поделиться
              /> */}
            </div>
            {/* {props.userId === id && <Icon28EditOutline />} Редактирование*/}
          </div>
        </div>
      )}
    </Group>
  );
};

export default Post;
