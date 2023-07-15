import { useRouter } from '@happysanta/router';
import {
  Avatar,
  Counter,
  Footnote,
  Headline,
  ScreenSpinner,
  SimpleCell,
  Text,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import { PAGE_MESSAGES_ID } from '../routes';
import { useAppSelector } from '../hooks/redux';
import $api from '../http';
import { UserType } from '../types/User';
import { PF } from '../constants';

export interface MessageProps {
  _id: string;
  usersId: string[];
}
const MessageView = (props: MessageProps) => {
  const router = useRouter();
  const { id } = useAppSelector((state) => state.authReducer);
  const [user, setUser] = useState<UserType>();
  const [unread, setUnread] = useState<number>(0);

  useEffect(() => {
    const friendId = props.usersId.find((m) => m !== id);

    const getUser = async () => {
      try {
        const res = await $api.post<UserType>('/users/id', { id: friendId });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getUnread = async () => {
      try {
        const res = await $api.post<number>('chats/unreadMessage', {
          chatId: props._id,
        });
        setUnread(res.data);
      } catch (error) {
        console.log(error);
      }
    };
getUnread()
    getUser();
  }, [id]);

  return user ? (
    <SimpleCell
      onClick={() => router.pushPage(PAGE_MESSAGES_ID, { id: user.username! })}
      before={
        <Avatar
          src={
            user.profilePicture?.length !== 0 && user.profilePicture
              ? PF + user.profilePicture
              : PF + 'avatar.png'
          }
        />
      }
      indicator={unread > 0 ?<Counter>{unread}</Counter>:<></>}
    >
      <div className="message-text">
        <Headline weight="2">
          {user.name} {user.lastname}
        </Headline>
      </div>
    </SimpleCell>
  ) : (
    <ScreenSpinner state="loading" />
  );
};

export default MessageView;
