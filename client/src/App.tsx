import { useLocation, useRouter } from '@happysanta/router';
import {
  AppRoot,
  SplitLayout,
  View,
  PanelHeader,
  SplitCol,
} from '@vkontakte/vkui';
import './app.css';
import { useEffect, useState } from 'react';
import {
  PAGE_AUTH,
  PAGE_FEED,
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
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const [activeStory, setActiveStory] = useState(location.getViewId());
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  useEffect(() => {
    const currentPage = location.getPageId();
    const isPublic = publicRoutes.includes(currentPage);
    if (!isAuth) {
      !isPublic && router.pushPage(PAGE_AUTH);
      const story =
        location.getViewActivePanel(VIEW_AUTH) || PANEL_REGISTRATION;

      setActiveStory(story);
    } else {
      isPublic && router.pushPage(PAGE_FEED);
      setActiveStory(location.getViewId());
    }
  }, [location, isAuth]);

  return (
    <AppRoot>
      {isAuth ? (
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
