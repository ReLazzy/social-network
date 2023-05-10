import { useLocation, useRouter } from '@happysanta/router';
import {
  AppRoot,
  SplitLayout,
  Button,
  Div,
  Title,
  FormLayout,
  FormItem,
  Input,
  Checkbox,
  Link,
  Select,
  Text,
  Headline,
  View,
  Panel,
  PanelHeader,
  SplitCol,
  ButtonGroup,
} from '@vkontakte/vkui';
import './app.css';
import { FormEvent, useEffect, useState } from 'react';
import {
  PAGE_AUTH,
  PAGE_FEED,
  PAGE_LOGIN,
  PANEL_FEED,
  PANEL_LOGIN,
  PANEL_REGISTRATION,
  VIEW_AUTH,
  VIEW_FEED,
} from './routes';
import Login from './pages/Login';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { UserType } from './types/User';
import { userSlice } from './store/reducers/User/UserSlice';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { checkUser } from './store/reducers/Auth/AuthActionCreators';

function App() {
  const location = useLocation();

  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const [activeStory, setActiveStory] = useState(location.getViewId());
  const dispatch = useAppDispatch();
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [purpose, setPurpose] = useState('');
  // const [showPatronymic, setShowPatronymic] = useState(true);
  useEffect(() => {
    dispatch(checkUser());
  }, []);
  useEffect(() => {
    if (isAuth) router.pushPage(PAGE_FEED);
    else router.pushPage(PAGE_AUTH);
  }, [isAuth]);
  useEffect(() => {
    setActiveStory(location.getViewId());
  }, [location]);
  return (
    <AppRoot>
      {isAuth ? (
        <Home activeStory={activeStory} setActiveStory={setActiveStory}></Home>
      ) : (
        <SplitLayout header={<PanelHeader separator={false} />}>
          <SplitCol maxWidth="600px" style={{ margin: '0 auto' }}>
            <View
              id={VIEW_AUTH}
              activePanel={location.getViewActivePanel(VIEW_AUTH)!}
            >
              <Login id={PANEL_LOGIN}></Login>
              <Auth id={PANEL_REGISTRATION}></Auth>
            </View>
          </SplitCol>
        </SplitLayout>
      )}
    </AppRoot>
  );
}

export default App;
