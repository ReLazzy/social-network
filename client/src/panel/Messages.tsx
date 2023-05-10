import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  Placeholder,
} from '@vkontakte/vkui';
import React from 'react';
import Message from '../components/Message';
import { Icon28MessageOutline } from '@vkontakte/icons';
import { PanelIDProps } from '../types/Panel';
import Navbar from '../components/Navbar';

const Messages = (props: PanelIDProps) => {
  return (
    <Panel id={props.id}>
      <Navbar text="Сообщения" />
      <Group>
        {/* <Placeholder
          icon={<Icon28MessageOutline width={56} height={56} />}
        ></Placeholder> */}

        <Message />
        <Message />
      </Group>
    </Panel>
  );
};

export default Messages;
