import {
  Avatar,
  Counter,
  Footnote,
  Headline,
  SimpleCell,
  Text,
} from '@vkontakte/vkui';
import React from 'react';
interface MessageType {
  userId: number;
  text: string;
  image?: string;
}
interface MessageProps {
  chatId: string;
  image: string;
  lastMessage: MessageType;
  unReadMessage: number;
}
const Message = () => {
  return (
    <SimpleCell
      before={
        <Avatar
          src={
            'https://sun9-20.userapi.com/impg/LaWkQb5TUc4qBbr-h-BdTre9tT8sly1Sp_G3gA/lgsPHbG8Tq8.jpg?size=531x415&quality=96&sign=ac5fab84e732e4a3bffec2261080b01c&type=album'
          }
        />
      }
      after={<Counter>12</Counter>}
    >
      <div className="message-text">
        <Headline weight="2">Рустам Назирович</Headline>
        <Footnote>Вы: Фотография</Footnote>
      </div>
    </SimpleCell>
  );
};

export default Message;
