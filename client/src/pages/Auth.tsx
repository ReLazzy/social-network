import { useRouter } from '@happysanta/router';
import {
  Button,
  ButtonGroup,
  Checkbox,
  DateInput,
  FormItem,
  FormLayout,
  Input,
  Link,
  Panel,
  PanelHeader,
  Title,
} from '@vkontakte/vkui';
import { FormEvent, useState } from 'react';
import { PAGE_LOGIN } from '../routes';
import { PanelIDProps } from '../types/Panel';
import { REG_EMAIL, REG_PASS } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { registerUser } from '../store/reducers/Auth/AuthActionCreators';
import { IUser } from '../types/modals/IUser';

const Auth = (props: PanelIDProps) => {
  const router = useRouter();

  const { isLoading, error } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const [username, setUserName] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [date, setDate] = useState<Date>(() => new Date());
  const register = () => {
    const user: IUser = {
      email: email,
      username: username,
      name: name,
      lastname: lastName,
      password: password,
      birthday: date,
    };
    dispatch(registerUser(user));
  };
  return (
    <Panel id={props.id}>
      <PanelHeader> Регистрация</PanelHeader>
      <FormLayout>
        {error && <Title> {error}</Title>}
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="username"
          status={
            username.length === 0
              ? 'default'
              : username.length >= 3
              ? 'valid'
              : 'error'
          }
        >
          <Input
            type="text"
            name="username"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </FormItem>
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="Имя"
          status={
            name.length === 0 ? 'default' : name.length >= 3 ? 'valid' : 'error'
          }
        >
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormItem>
        <FormItem
          bottom="Длина должна быть больше 3 символов"
          top="Фамилия"
          status={
            lastName.length === 0
              ? 'default'
              : lastName.length >= 3
              ? 'valid'
              : 'error'
          }
        >
          <Input
            type="text"
            name="lastNname"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </FormItem>
        <FormItem
          top="E-mail"
          status={REG_EMAIL.test(email) ? 'valid' : 'error'}
          bottom={
            email
              ? 'Электронная почта введена верно!'
              : 'Пожалуйста, введите электронную почту'
          }
        >
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormItem>

        <FormItem
          top="Пароль"
          status={REG_PASS.test(password) ? 'valid' : 'error'}
          bottom={
            REG_PASS.test(password)
              ? 'Пароль может содержать только латинские буквы и цифры.'
              : ''
          }
        >
          <Input
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormItem>

        <FormItem
          bottom={
            password === confirmPassword
              ? 'Пароли совпадают'
              : 'Пароли не совпадают'
          }
        >
          <Input
            status={
              confirmPassword === ''
                ? 'default'
                : password === confirmPassword
                ? 'valid'
                : 'error'
            }
            type="password"
            name="confirmPassword"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </FormItem>
        <FormItem top="Дата рождения">
          <DateInput value={date} onChange={(e: Date) => setDate(e)} />
        </FormItem>

        <Checkbox>
          Согласен со всем <Link>этим</Link>
        </Checkbox>
        <FormItem>
          <ButtonGroup mode="horizontal" gap="m" stretched>
            <Button onClick={register} loading={isLoading} size="l" stretched>
              Регистрация
            </Button>
            <Button
              size="l"
              mode="secondary"
              onClick={() => {
                router.pushPage(PAGE_LOGIN);
              }}
            >
              Есть аккаунт
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Panel>
  );
};

export default Auth;
