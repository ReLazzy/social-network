import { Avatar, Button, ButtonGroup, SimpleCell, Text } from '@vkontakte/vkui';

import style from './Friend.module.css';
import { FriendType, FriendsResponse } from '../types/modals/friendsResponse';
import { useRouter } from '@happysanta/router';
import { PAGE_MESSAGES_ID, PAGE_PROFILE } from '../routes';
import $api from '../http';
import { PF } from '../constants';

const Friend = (props: FriendType) => {
  const router = useRouter();

  return (
    <SimpleCell
      onClick={() => router.pushPage(PAGE_PROFILE, { id: `${props.username}` })}
      before={
        <Avatar src={props.profilePicture && PF + props.profilePicture} />
      }
      after={
        <Button
          onClick={async (e) => {
            e.stopPropagation();
            try {
              const res = await $api.post('/chats/', {
                receiverId: props._id,
              });

              router.pushPage(PAGE_MESSAGES_ID, { id: `${props.username}` });
            } catch (err) {
              console.log('произошла ошибка', err);
            }
          }}
          mode="outline"
          size="s"
        >
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
