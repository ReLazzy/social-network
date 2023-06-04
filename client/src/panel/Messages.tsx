import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Placeholder,
} from '@vkontakte/vkui';
import React, { useEffect, useState } from 'react';
import Message, { MessageProps } from '../components/MessageView';
import { Icon28MessageOutline } from '@vkontakte/icons';
import { PanelIDProps } from '../types/Panel';
import Navbar from '../components/Navbar';
import { useLocation, useRouter } from '@happysanta/router';
import Chat from '../components/Chat';
import axios from 'axios';
import $api from '../http';
import MessageView from '../components/MessageView';

const Messages = (props: PanelIDProps) => {
  const location = useLocation();
  const params = location.getParams();
  const id = params.id;

  const [chats, setChats] = useState<MessageProps[]>([]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await $api.post('/chats/user');
        setChats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, []);

  return (
    <Panel id={props.id}>
      <Navbar text="Сообщения" />

      {id ? (
        <Chat username={id}></Chat>
      ) : (
        <Group style={{ height: '1000px' }}>
          {chats.map((chat) => (
            <MessageView key={chat._id} {...chat} />
          ))}
        </Group>
      )}
    </Panel>
  );
};

export default Messages;
