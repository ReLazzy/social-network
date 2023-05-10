import { Avatar, Button, Group, Title, Text } from '@vkontakte/vkui';
import React, { useEffect, useRef, useState } from 'react';
import { UserType } from '../types/User';
import style from './Head.module.css';

import { useLocation, useRouter } from '@happysanta/router';
import { MODAL_EDIT_PROFILE } from '../routes';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  followUser,
  unfollowUser,
} from '../store/reducers/Auth/AuthActionCreators';

const Head = (user: UserType) => {
  const router = useRouter();
  const { username, followings, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const dispatch = useAppDispatch();
  console.log(Array.isArray(followings));
  console.log(followings);

  const [follow, setFollow] = useState<boolean>(followings.includes(user._id));

  const location = useLocation();
  const params = location.getParams();
  const id = params.id;

  const currentYear = new Date();
  const profileYear = new Date(user.birthday);
  const m = currentYear.getMonth() - profileYear.getMonth();
  const d =
    m < 0 || (m === 0 && currentYear.getDate() < profileYear.getDate()) ? 1 : 0;
  const y = currentYear.getFullYear() - profileYear.getFullYear();

  const curentAge = y - d;
  useEffect(() => {
    setFollow(followings.includes(user._id));
  }, [followings]);
  return (
    <Group>
      <div className={style.container}>
        <img
          alt="fon"
          src="https://sun9-43.userapi.com/etNQHi8548036PMIOBSZHF7adBCzZCAyBh0DQQ/vo0ndN0E82A.jpg"
        />
        <div className={style.content}>
          <Avatar
            className={style.avatar}
            src={
              'https://sun9-35.userapi.com/impg/A6qGU-NHjJreFcyMytAVuuraRHfu1ixlC7GKkw/2C2nH5_jtVM.jpg?size=720x1080&quality=95&sign=199fcf4910f265cb77b9a82087a17a43&type=album'
            }
            size={100}
          />

          <div className={style.info}>
            <Title
              style={{ marginBottom: 8, marginTop: 20 }}
              level="2"
              weight="2"
            >
              {user.name} {user.lastname}
            </Title>
            <Text
              style={{
                marginBottom: 24,
                color: 'var(--vkui--color_text_secondary)',
              }}
            >
              {user.city}
              Возраст: {curentAge}
            </Text>
          </div>
          {username === id ? (
            <Button
              onClick={() => router.pushModal(MODAL_EDIT_PROFILE)}
              style={{ height: '35px' }}
              mode="outline"
            >
              Редактировать
            </Button>
          ) : follow ? (
            <Button
              loading={isLoading}
              onClick={() => {
                dispatch(unfollowUser(id));
              }}
              style={{ height: '35px' }}
              mode="outline"
            >
              Отписаться
            </Button>
          ) : (
            <Button
              loading={isLoading}
              onClick={() => {
                dispatch(followUser(id));
              }}
              style={{ height: '35px' }}
              mode="outline"
            >
              Подписаться
            </Button>
          )}
        </div>
      </div>
    </Group>
  );
};

export default Head;
