import { Icon28UsersOutline } from '@vkontakte/icons';
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Search,
} from '@vkontakte/vkui';
import React, { ChangeEventHandler, FormEvent } from 'react';
import { PanelIDProps } from '../types/Panel';
import Friend from '../components/Friend';
import Navbar from '../components/Navbar';

const Friends = (props: PanelIDProps) => {
  const [search, setSearch] = React.useState('');

  const onChange = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Panel id={props.id}>
      <Navbar text="Друзья" />
      <Group style={{ height: '1000px' }}>
        <Search value={search} onChange={onChange} after={null} />

        {/* <Placeholder
          icon={<Icon28UsersOutline width={56} height={56} />}
        ></Placeholder> */}
        <Friend></Friend>
      </Group>
    </Panel>
  );
};

export default Friends;
