import { Icon24SendOutline, Icon28MessageOutline } from '@vkontakte/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  FormItem,
  FormLayout,
  FormLayoutGroup,
  Group,
  File,
  Placeholder,
  Separator,
  Spacing,
  Text,
  Textarea,
  Subhead,
} from '@vkontakte/vkui';
import React, {
  Dispatch,
  KeyboardEventHandler,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CreatePost from './CreatePost';
import $api from '../http';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { UserType } from '../types/User';
import { uploadImage } from '../store/reducers/Upload/UploadACtionCreator';
import { format } from 'timeago.js';
import Message from './Message';
import { Socket, io } from 'socket.io-client';
import { useRouter } from '@happysanta/router';
import { PAGE_PROFILE } from '../routes';
import { PF } from '../constants';
import { checkChats } from '../store/reducers/Chats/ChatsActionCreator';
import { chatsSlice } from '../store/reducers/Chats/ChatsSlice';
import socket from '../socket';

interface ChatProps {
  username: string;
}
interface ChatType {
  _id: string;
  usersId: string[];
}

export interface MessageType {
  chatId: string;
  _id: string;
  createdAt: string;
  text?: string;
  img?: string;
  userId: string;
}
interface NewMessageType {
  text?: string;
  img?: string;
  chatId: string;
}

const Chat = (props: ChatProps) => {
  const router = useRouter();
  const [chat, setChat] = useState<ChatType>();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [arrivalMessages, setArrivalMessages] = useState<
    MessageType | undefined
  >(undefined);

  const { id, username } = useAppSelector((state) => state.authReducer);

  const [currentUser, setCurrentUser] = useState<UserType>();
  const [senderUser, setSenderUser] = useState<UserType>();

  const [newMessageText, setNewMessageText] = useState<string>('');
  const [file, setFile] = useState<Blob | MediaSource>();
  const [fileUrl, setFileUrl] = useState<string>('');
  const data = new FormData();

  const dispatch = useAppDispatch();

  const scrollRef = useRef<null | HTMLDivElement>(null);

  const { deleteChats } = chatsSlice.actions;
  const { isLoading, error } = useAppSelector((state) => state.uploadReducer);
  console.log('перерендер');
  const handleOnChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        alert('Загрузите фотку');
        return;
      }

      const maxFileSize = 5 * 1024 * 1024; //5mb
      const fileSize = file.size;
      if (fileSize > maxFileSize)
        alert('Размер файла превышает максимальный размер');
      else {
        setFile(file);
        const fileName = Date.now() + file.name;
        setFileUrl(fileName);
        data.append('name', fileName);
        data.append('file', file);
        dispatch(uploadImage(data));
      }
    }
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const newMessage: NewMessageType = {
      text: newMessageText,
      img: fileUrl,
      chatId: chat!._id,
    };

    if (newMessage.text === '' && newMessage.img === '') {
      console.log('Вы клоун?');
      return;
    }

    try {
      const res = await $api.post<MessageType>('/messages', newMessage);

      socket.emit('sendMessage', {
        chatId: chat?._id,
        senderId: id,
        receiverId: currentUser?._id,
        message: res.data,
      });
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
      alert('не удалось отправить сообщение');
    }
    setNewMessageText('');
    setFile(undefined);
    setFileUrl('');
  };

  useEffect(() => {
    console.log('перерендер из за 1');
    arrivalMessages &&
      !messages.includes(arrivalMessages) &&
      chat?.usersId.includes(arrivalMessages.userId) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, chat]);

  useEffect(() => {
    console.log('перерендер из за 2');
    id &&
      socket.on('getMessage', (data) => {
        setArrivalMessages(data.message);
      });
  }, [id]);

  useMemo(() => {
    const getUser = async (
      username: string,
      setUser: Dispatch<SetStateAction<UserType | undefined>>
    ) => {
      try {
        const res = await $api.post<UserType>('/users/username', {
          username: username,
        });

        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getChats = async () => {
      try {
        const res = await $api.post<ChatType>('/chats/userId', {
          userId: props.username,
        });

        setChat(res.data);
      } catch (err) {
        setChat(undefined);
        console.log(err);
      }
    };
    console.log('перерендер из за 3', props, username);
    getChats();
    getUser(props.username, setCurrentUser);
    getUser(username, setSenderUser);
  }, [props.username, username]);

  useEffect(() => {
    console.log('перерендер из за 4');
    chat && dispatch(deleteChats(chat._id));
    const getMessages = async () => {
      try {
        const res = await $api.post<MessageType[]>('/messages/all', {
          chatId: chat?._id,
        });

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [chat]);

  useEffect(() => {
    console.log('перерендер из за 5');
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return chat ? (
    <Group>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',

          margin: '0 10px ',
        }}
      >
        <Text>
          {currentUser?.name} {currentUser?.lastname}
        </Text>
        <Avatar
          onClick={() =>
            router.pushPage(PAGE_PROFILE, { id: `${props.username}` })
          }
          size={45}
          src={
            currentUser?.profilePicture?.length !== 0 &&
            currentUser?.profilePicture
              ? PF + currentUser?.profilePicture
              : PF + 'background.jpg'
          }
        ></Avatar>
      </div>
      <Spacing size={24}>
        <Separator />
      </Spacing>
      <div className="container" style={{ height: '60vh', overflowY: 'auto' }}>
        {messages.map((message) => {
          const messageUser = message.userId === id ? senderUser : currentUser;
          return (
            <div key={message._id} ref={scrollRef}>
              <Message
                user={messageUser!}
                own={message.userId === id}
                message={message}
              />
            </div>
          );
        })}
      </div>

      <FormLayout onKeyDown={handleKeyDown}>
        <FormItem>
          <Textarea
            autoFocus={true}
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            rows={1}
            placeholder="Напишите сообщение..."
          />
        </FormItem>

        {file && (
          <FormItem>
            <div>
              <img
                onClick={() => {
                  setFile(undefined);
                  setFileUrl('');
                }}
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
              onClick={handleSubmit}
              mode="outline"
              size="m"
              after={<Icon24SendOutline />}
            >
              {'Отправить'}
            </Button>
          </ButtonGroup>
        </FormItem>
      </FormLayout>
    </Group>
  ) : (
    <Group>
      <Placeholder icon={<Icon28MessageOutline width={56} height={56} />}>
        Видимо этого чата нет
      </Placeholder>
    </Group>
  );
};

export default Chat;
