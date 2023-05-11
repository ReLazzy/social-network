import { Avatar, Button, ButtonGroup, SimpleCell, Text } from '@vkontakte/vkui';

import style from './Friend.module.css';
import { FriendType, FriendsResponse } from '../types/modals/friendsResponse';
import { useRouter } from '@happysanta/router';
import { PAGE_PROFILE } from '../routes';

const Friend = (props: FriendType) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const router = useRouter();
  return (
    <SimpleCell
      onClick={() => router.pushPage(PAGE_PROFILE, { id: `${props.username}` })}
      before={
        <Avatar src={props.profilePicture && PF + props.profilePicture} />
      }
      after={
        <Button mode="outline" size="s">
          Написать
        </Button>
      }
    >
      <div className={style.content}>
        <Text>
          {props.name} {props.lastname}
        </Text>
      </div>
    </SimpleCell>
  );
};

export default Friend;
