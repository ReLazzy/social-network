import { Avatar, Button, ButtonGroup, SimpleCell, Text } from '@vkontakte/vkui';

import style from './Friend.module.css';
import { FriendType, FriendsResponse } from '../types/modals/friendsResponse';
import { useRouter } from '@happysanta/router';
import { PAGE_PROFILE } from '../routes';

const Friend = (props: FriendType) => {
  const router = useRouter();
  return (
    <SimpleCell
      onClick={() => router.pushPage(PAGE_PROFILE, { id: `${props.username}` })}
      before={
        <Avatar
          src={
            'https://sun9-20.userapi.com/impg/LaWkQb5TUc4qBbr-h-BdTre9tT8sly1Sp_G3gA/lgsPHbG8Tq8.jpg?size=531x415&quality=96&sign=ac5fab84e732e4a3bffec2261080b01c&type=album'
          }
        />
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
