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
import { useEffect, useState } from 'react';
import { UserType } from '../types/User';
import { useRouter } from '@happysanta/router';
import { MODAL_EDIT_POST } from '../routes';
import { ReseivedPostType } from '../types/Post';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getUserById } from '../store/reducers/User/UserActionCreators';
import PostService from '../services/PostService';
import { likePost } from '../store/reducers/Post/PostActionCreator';

const Post = (props: ReseivedPostType) => {
  const router = useRouter();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { id } = useAppSelector((state) => state.authReducer);

  const [like, setLike] = useState(props.likes.length);
  const [isLiked, setIsLiked] = useState<boolean>(props.likes.includes(id));
  const {
    user: currUser,
    isLoading,
    error,
  } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  const likeHandler = () => {
    const postId: string = props._id;
    dispatch(likePost(postId));
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  console.log(PF, props.image);

  return (
    <Group>
      {isLoading && <ScreenSpinner state="loading" />}
      {error && <Title>{error}</Title>}
      {props && (
        <div className={style.container}>
          <div className={style.author}>
            <Avatar src={PF + props.profilePicture} />
            <div>
              <Headline weight="2">
                {props.name} {props.lastname}
              </Headline>
              <Subhead weight="3">{props.time}</Subhead>
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
              <Icon28ShareOutline onClick={() => console.log(props._id)} />
            </div>
            {props.userId === id && (
              <Icon28EditOutline
                onClick={() =>
                  router.pushModal(MODAL_EDIT_POST, { idPost: `${props._id}` })
                }
              />
            )}
          </div>
        </div>
      )}
    </Group>
  );
};

export default Post;
