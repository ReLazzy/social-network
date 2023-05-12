import {
  Button,
  ButtonGroup,
  FormItem,
  FormLayout,
  Group,
  Header,
  ModalPage,
  ScreenSpinner,
  File,
  Textarea,
  Input,
  Title,
} from '@vkontakte/vkui';
import React, { useState } from 'react';

import { Icon24SendOutline } from '@vkontakte/icons';
import { UpdateUser } from '../../services/UserService';
import { uploadImage } from '../../store/reducers/Upload/UploadACtionCreator';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { REG_PASS } from '../../constants';
import { updateUserFunc } from '../../store/reducers/User/UserActionCreators';
import { PanelIDProps } from '../../types/Panel';
import { useRouter } from '@happysanta/router';
import { PAGE_PROFILE } from '../../routes';

const ModalEdit = (props: PanelIDProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.userReducer);
  const { username } = useAppSelector((state) => state.authReducer);
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const [fileProfile, setProfileFile] = useState<Blob | MediaSource>();
  const [fileProfileUrl, setProfileFileUrl] = useState<string>('');
  const [fileCover, setCoverFile] = useState<Blob | MediaSource>();
  const [fileCoverUrl, setCoverFileUrl] = useState<string>('');
  const router = useRouter();
  const data = new FormData();
  // password: string;
  //   name: string;
  //   lastname: string;
  //   city: string;
  //   profilePicture: string;
  //   coverPicture: string;

  const submit = () => {
    const updateUser: UpdateUser = {};
    if (REG_PASS.test(password)) updateUser['password'] = password;
    if (name.length >= 3) updateUser['name'] = name;
    if (lastname.length >= 3) updateUser['lastname'] = lastname;
    if (city.length >= 3) updateUser['city'] = city;
    if (city.length >= 3) updateUser['city'] = city;
    if (fileCover) updateUser['coverPicture'] = fileCoverUrl;
    if (fileProfile) updateUser['profilePicture'] = fileProfileUrl;
    dispatch(updateUserFunc(updateUser));
    router.pushPage(PAGE_PROFILE, { id: `${username}` });
  };
  const handleOnChange = (
    e: any,
    setFileUrl: (e: string) => void,
    setFile: (e: Blob | MediaSource) => void
  ) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const file: any = e.target.files[0];
      setFile(file);
      const fileName = Date.now() + file.name;
      setFileUrl(fileName);
      data.append('name', fileName);
      data.append('file', file);
      dispatch(uploadImage(data));
    }
  };

  return (
    <ModalPage id={props.id}>
      <Group header={<Header mode="secondary">Пост</Header>}>
        <FormLayout>
          <FormItem>
            {error && <Title>{error}</Title>}
            <Button loading={isLoading} onClick={submit}>
              Отправить изменения
            </Button>
          </FormItem>
          <FormItem>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
            />
          </FormItem>
          <FormItem>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Имя"
            />
          </FormItem>

          <FormItem>
            <Input
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Фамилия"
            />
          </FormItem>
          <FormItem>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Город"
            />
          </FormItem>

          <FormItem>
            <ButtonGroup
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <File
                onChange={(e) =>
                  handleOnChange(e, setProfileFileUrl, setProfileFile)
                }
                size="m"
                mode="outline"
              >
                Фотография профиля
              </File>
              <File
                onChange={(e) =>
                  handleOnChange(e, setCoverFileUrl, setCoverFile)
                }
                size="m"
                mode="outline"
              >
                Фотография Обложки
              </File>
            </ButtonGroup>
          </FormItem>
        </FormLayout>
        {fileProfile && (
          <FormItem>
            <div>
              <img
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  height: 'auto',
                }}
                src={URL.createObjectURL(fileProfile)}
                alt="image"
              />
            </div>
          </FormItem>
        )}
        {fileCover && (
          <FormItem>
            <div>
              <img
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  height: 'auto',
                }}
                src={URL.createObjectURL(fileCover)}
                alt="image"
              />
            </div>
          </FormItem>
        )}
      </Group>
    </ModalPage>
  );
};

export default ModalEdit;
