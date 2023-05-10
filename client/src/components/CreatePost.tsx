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
import { PostProps } from './Post';

import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { uploadImage } from '../store/reducers/Upload/UploadACtionCreator';
import { addPost } from '../store/reducers/Post/PostActionCreator';

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
        {error && <Title>{error}</Title>}
        {errorCreate && <Title>{errorCreate}</Title>}
        <FormItem>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
            placeholder="Что нового?"
          />
        </FormItem>
        {isLoading && <ScreenSpinner state="loading" />}
        {isLoadingCreate && <ScreenSpinner state="loading" />}
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
            <File onChange={handleOnChange} size="m" mode="outline">
              Фотография
            </File>
            <Button
              onClick={submit}
              mode="outline"
              size="m"
              after={<Icon24SendOutline />}
            >
              Опубликовать
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Group>
  );
};

export default CreatePost;
