import { Avatar, Button, ButtonGroup, SimpleCell, Text } from '@vkontakte/vkui';

import style from './Friend.module.css';

const Friend = () => {
  return (
    <SimpleCell
      before={
        <Avatar
          src={
            'https://sun9-20.userapi.com/impg/LaWkQb5TUc4qBbr-h-BdTre9tT8sly1Sp_G3gA/lgsPHbG8Tq8.jpg?size=531x415&quality=96&sign=ac5fab84e732e4a3bffec2261080b01c&type=album'
          }
        />
      }
      after={
        <Button mode="outline" size="s">
          Написать
        </Button>
      }
    >
      <div className={style.content}>
        <Text>Рустам Назирович</Text>
      </div>
    </SimpleCell>
  );
};

export default Friend;
