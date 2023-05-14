import { Icon24Camera } from '@vkontakte/icons';
import { Icon24SendOutline } from '@vkontakte/icons';
import {
  FormItem,
  FormLayout,
  File,
  Textarea,
  Button,
  FormLayoutGroup,
  ButtonGroup,
  Group,
  ScreenSpinner,
  Title,
} from '@vkontakte/vkui';

import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { uploadImage } from '../store/reducers/Upload/UploadACtionCreator';
import { addPost, fetchPost } from '../store/reducers/Post/PostActionCreator';
import { useRouter } from '@happysanta/router';
import { PAGE_FEED } from '../routes';
import { ReseivedPostType } from '../types/Post';
import { AsyncThunkAction } from '@reduxjs/toolkit';

export interface SendPostType {
  desc?: string;
  image?: string;
}

const CreatePost = () => {
  const { isLoading, error } = useAppSelector((state) => state.uploadReducer);

  const { isLoading: isLoadingCreate, error: errorCreate } = useAppSelector(
    (state) => state.postReducer
  );
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>('');
  const [file, setFile] = useState<Blob | MediaSource>();
  const [fileUrl, setFileUrl] = useState<string>('');

  const data = new FormData();

  const submit = () => {
    const newPost: SendPostType = { desc: text, image: fileUrl };
    if (newPost.desc === '' && newPost.image === '') {
      console.log('Вы клоун?');
      return;
    }

    dispatch(addPost(newPost));
    setText('');
    setFile(undefined);
    setFileUrl('');
  };
  const handleOnChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setFile(file);
      const fileName = Date.now() + file.name;
      setFileUrl(fileName);
      data.append('name', fileName);
      data.append('file', file);
      dispatch(uploadImage(data));
    }
  };

  return (
    <Group>
      <FormLayout>
        <FormItem>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Что нового?"
          />
        </FormItem>

        {file && (
          <FormItem>
            <div>
              <img
                style={{
                  borderRadius: '15px',
                  width: '100%',
                  height: 'auto',
                }}
                src={URL.createObjectURL(file)}
                alt="image"
              />
            </div>
          </FormItem>
        )}
        <FormItem>
          <ButtonGroup
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <File
              loading={isLoading}
              onChange={handleOnChange}
              size="m"
              mode="outline"
            >
              {error ? error : 'Фотография'}
            </File>
            <Button
              loading={isLoadingCreate}
              onClick={submit}
              mode="outline"
              size="m"
              after={<Icon24SendOutline />}
            >
              {errorCreate ? errorCreate : 'Опубликовать'}
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Group>
  );
};

export default CreatePost;
