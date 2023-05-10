import { useRouter } from '@happysanta/router';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import React from 'react';
import { PAGE_AUTH } from '../routes';
import { useAppDispatch } from '../hooks/redux';
import { checkUser } from '../store/reducers/Auth/AuthActionCreators';
interface NavbarProps {
  text: string;
}
const Navbar = (props: NavbarProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <PanelHeader
      before={
        <PanelHeaderBack
          onClick={() => {
            router.popPage();
          }}
        />
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {props.text}
        <Icon24Cancel
          onClick={() => {
            localStorage.removeItem('token');
            dispatch(checkUser());
          }}
        ></Icon24Cancel>
      </div>
    </PanelHeader>
  );
};

export default Navbar;
