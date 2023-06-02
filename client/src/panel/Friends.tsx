import { Icon28UsersOutline } from '@vkontakte/icons';
import {
  Group,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  ScreenSpinner,
  Search,
  Title,
} from '@vkontakte/vkui';
import React, {
  ChangeEventHandler,
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { PanelIDProps } from '../types/Panel';
import Friend from '../components/Friend';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchFrends } from '../store/reducers/Friends/FriendActionCreator';
import { FriendType } from '../types/modals/friendsResponse';
import $api from '../http';

const Friends = (props: PanelIDProps) => {
  const [search, setSearch] = useState('');
  const [findFriend, setFindFriend] = useState<FriendType[]>([]);
  const { friendlist, isLoading, error } = useAppSelector(
    (state) => state.friendsReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFrends());
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await $api.post<FriendType[]>('/users/search', {
          searchQuery: search,
        });

        setFindFriend(res.data);
      } catch (error) {
        setFindFriend([]);
        console.log(error);
      }
    };
    getUsers();
  }, [search]);

  const onChange = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Panel id={props.id}>
      <Navbar text="Друзья" />
      <Group style={{ height: '1000px' }}>
        <Search value={search} onChange={onChange} after={null} />
        {findFriend &&
          findFriend.map((friend) => (
            <Friend key={friend._id + '_find'} {...friend} />
          ))}
        {isLoading && <ScreenSpinner state="loading" />}
        {error && <Title>{error}</Title>}
        {findFriend.length === 0 &&
          friendlist.map((friend) => (
            <Friend key={friend._id + '_friend'} {...friend} />
          ))}
        {/* <Placeholder
          icon={<Icon28UsersOutline width={56} height={56} />}
        ></Placeholder> */}
      </Group>
    </Panel>
  );
};

export default Friends;
