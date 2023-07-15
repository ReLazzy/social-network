import { useLocation, useRouter } from '@happysanta/router';
import {
  AppRoot,
  SplitLayout,
  View,
  PanelHeader,
  SplitCol,
  Spinner,
} from '@vkontakte/vkui';
import './app.css';
import { useEffect, useState } from 'react';
import {
  PAGE_AUTH,
  PAGE_FEED,
  PAGE_LOGIN,
  PANEL_LOGIN,
  PANEL_REGISTRATION,
  VIEW_AUTH,
  publicRoutes,
} from './routes';
import Login from './pages/Login';
import Auth from './pages/Auth';
import Home from './pages/Home';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import { checkUser } from './store/reducers/Auth/AuthActionCreators';

function App() {
  const location = useLocation();

  const router = useRouter();
  const { isAuth, id, isLoading } = useAppSelector(
    (state) => state.authReducer
  );
  const [activeStory, setActiveStory] = useState(location.getViewId());
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(0);

    dispatch(checkUser());
  }, []);

  useEffect(() => {
    const currentPage = location.getPageId();
    const isPublic = publicRoutes.includes(currentPage);
    if (!isAuth) {
      console.log(false);
      const story = location.getViewActivePanel(VIEW_AUTH) || PANEL_LOGIN;
      console.log(story);

      setActiveStory(story);
      !isPublic && router.pushPage(PAGE_LOGIN);
    } else {
      console.log(true);
      setActiveStory(location.getViewId());
      isPublic && router.pushPage(PAGE_FEED);
    }
  }, [location, isAuth]);
  console.log('isAuth:', isAuth);
  console.log('activeStory:', activeStory);
  return (
    <AppRoot>
      {isLoading ? (
        <Spinner size="large" style={{ margin: '20px 0' }} />
      ) : isAuth && id !== '' ? (
        <Home activeStory={activeStory} setActiveStory={setActiveStory}></Home>
      ) : (
        <SplitLayout header={<PanelHeader separator={false} />}>
          <SplitCol maxWidth="600px" style={{ margin: '0 auto' }}>
            <View id={VIEW_AUTH} activePanel={activeStory}>
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
