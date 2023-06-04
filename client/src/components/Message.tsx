import React from 'react';
import { UserType } from '../types/User';
import { MessageType } from './Chat';
import { Avatar, Group, Subhead, Text } from '@vkontakte/vkui';
import { format } from 'timeago.js';
import { PF } from '../constants';

interface MessageProps {
  user: UserType;
  message: MessageType;
  own: boolean;
}
const Message = (props: MessageProps) => {
  const { user, message, own } = props;

  return (
    <div
      className="message"
      style={{
        display: 'flex',
        margin: '10px 0',
        justifyContent: `${own ? 'flex-end' : 'flex-start'}`,
        alignItems: 'center',
        gap: '10px',
      }}
      key={message._id}
    >
      {!own && (
        <Avatar
          size={30}
          src={
            user?.profilePicture?.length !== 0 && user?.profilePicture
              ? PF + user?.profilePicture
              : PF + 'background.jpg'
          }
        ></Avatar>
      )}

      <Group
        style={{
          maxWidth: '200px',
        }}
      >
        <Text style={{ margin: '10px', whiteSpace: 'pre-line' }}>
          {message.text}
        </Text>
        {message.img && (
          <div
            style={{
              margin: '10px',
            }}
          >
            <img
              style={{
                borderRadius: '15px',
                width: '100%',
                height: 'auto',
              }}
              src={PF + message.img}
              alt="image"
            />
          </div>
        )}
        <Subhead style={{ margin: '10px' }} weight="3">
          {format(message.createdAt)}
        </Subhead>
      </Group>
    </div>
  );
};

export default Message;
