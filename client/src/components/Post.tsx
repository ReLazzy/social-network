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
  Subhead,
  Text,
} from '@vkontakte/vkui';

import style from './Post.module.css';
import { useEffect, useState } from 'react';
import { UserType } from '../types/User';
import { useRouter } from '@happysanta/router';
import { MODAL_EDIT_POST } from '../routes';

export interface PostProps {
  userID: number;
  id: number;
  time: string;
  text?: string;
  image?: string;
  like: number;
}

const Post = (props: PostProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(props.like);
  // const user: UserType = users.find((user) => user.id === props.userID)!;
  return (
    <Group>
      {/* <div className={style.container}>
        <div className={style.author}>
          <Avatar src={user.avatar} />
          <div>
            <Headline weight="2">
              {user.name} {user.lastName}
            </Headline>
            <Subhead weight="3">{props.time}</Subhead>
          </div>
        </div>
        <Text>{props.text}</Text>
        {props.image && (
          <div className={style.image}>
            <img src={props.image} alt="image" />
          </div>
        )}
        <div className={style.bottomSide}>
          <div className={style.reaction}>
            {likedCount !== 0 ? (
              <Counter mode={isLiked ? 'prominent' : 'secondary'}>
                {likedCount}
              </Counter>
            ) : (
              ''
            )}

            <div
              onClick={() => {
                setIsLiked(!isLiked);
                const count = !isLiked ? likedCount + 1 : likedCount - 1;
                setLikedCount(count);
                // props.like = count;
              }}
            >
              {isLiked ? <Icon28LikeFillRed /> : <Icon28LikeOutline />}
            </div>
            <Icon28ShareOutline onClick={() => console.log(props.id)} />
          </div>
          {props.userID === AuthUser.id && (
            <Icon28EditOutline
              onClick={() =>
                router.pushModal(MODAL_EDIT_POST, { idPost: `${props.id}` })
              }
            />
          )}
        </div>
      </div> */}
    </Group>
  );
};

export default Post;
