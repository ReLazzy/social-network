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
} from '@vkontakte/vkui';
import { PostProps } from './Post';

import { useRef, useState } from 'react';

const CreatePost = () => {
  // const post: PostProps = {
  //   userID: AuthUser.id,
  //   id: posts.length,
  //   time: '',
  //   like: 0,
  // };
  // const addNewPost = () => {
  //   if (text === '' && image === '') return;
  //   post.text = text;
  //   post.image = image;
  //   posts[posts.length] = post;
  // };
  let a = useRef<HTMLInputElement>();
  const [text, setText] = useState<string | undefined>(undefined);
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState();

  const handleOnChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      setImage(file);
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

        <FormItem>
          <ButtonGroup
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <File onChange={handleOnChange} size="m" mode="outline">
              Фотография
            </File>
            <Button
              onClick={() => {}}
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
