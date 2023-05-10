import { useRouter } from '@happysanta/router';
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormItem,
  FormLayout,
  Input,
  Link,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { FormEvent, useEffect, useState } from 'react';
import { PAGE_AUTH, PAGE_FEED, PAGE_LOGIN } from '../routes';
import { PanelIDProps } from '../types/Panel';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { loginUser } from '../store/reducers/Auth/AuthActionCreators';

const Login = (props: PanelIDProps) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    const setStateAction = {
      email: setEmail,
      password: setPassword,
    }[name];

    setStateAction && setStateAction(value);
  };

  const { isLoading, error } = useAppSelector((state) => state.authReducer);

  const dispatch = useAppDispatch();

  return (
    <Panel id={props.id}>
      <PanelHeader>{error ? 'Не удалось войти' : 'Вход'}</PanelHeader>
      <FormLayout>
        <FormItem top="E-mail">
          <Input type="email" name="email" value={email} onChange={onChange} />
        </FormItem>

        <FormItem top="Пароль">
          <Input
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={onChange}
          />
        </FormItem>

        <FormItem>
          <ButtonGroup mode="horizontal" gap="m" stretched>
            <Button
              loading={isLoading}
              onClick={() => {
                dispatch(loginUser({ email, password }));
                router.pushPage(PAGE_FEED);
              }}
              size="l"
              stretched
            >
              Вход
            </Button>
            <Button
              size="l"
              mode="secondary"
              onClick={() => {
                router.pushPage(PAGE_AUTH);
              }}
            >
              Регистрация
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Panel>
  );
};

export default Login;
