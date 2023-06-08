import {
  Avatar,
  Button,
  Group,
  Title,
  Text,
  ScreenSpinner,
} from '@vkontakte/vkui';
import React, { useEffect, useRef, useState } from 'react';
import { UserType } from '../types/User';
import style from './Head.module.css';

import { useLocation, useRouter } from '@happysanta/router';
import { MODAL_EDIT_PROFILE, PAGE_EDIT_PROFILE } from '../routes';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  followUser,
  unfollowUser,
} from '../store/reducers/Auth/AuthActionCreators';
import { Icon28CakeOutline } from '@vkontakte/icons';
import { PF } from '../constants';

const Head = (user: UserType) => {
  const router = useRouter();
  const { username, followings, isLoading } = useAppSelector(
    (state) => state.authReducer
  );

  const dispatch = useAppDispatch();

  const [foll, setFollow] = useState<boolean>(followings.includes(user._id));

  const location = useLocation();
  const params = location.getParams();
  const id = params.id;

  const currentYear = new Date();
  const profileYear = new Date(user.birthday);

  const isBirthday =
    profileYear.getMonth() === currentYear.getMonth() &&
    profileYear.getDate() === currentYear.getDate();
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
          src={
            user.coverPicture?.length !== 0 && user.coverPicture
              ? PF + user.coverPicture
              : PF + 'background.jpg'
          }
        />
        <div className={style.content}>
          <Avatar
            className={style.avatar}
            src={
              user.profilePicture?.length !== 0 && user.profilePicture
                ? PF + user.profilePicture
                : PF + 'avatar.png'
            }
            size={100}
          />

          <div className={style.info}>
            <Title
              style={{
                marginBottom: 8,
                marginTop: 20,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
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
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user.city}
              </div>
              <div
                style={{ display: 'flex', gap: '5px', alignItems: 'flex-end' }}
              >
                Возраст: {curentAge} {isBirthday && <Icon28CakeOutline />}
              </div>
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
          ) : foll ? (
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
