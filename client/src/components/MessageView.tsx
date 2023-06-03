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

    getUser();
  }, []);

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
      after={<Counter></Counter>}
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
