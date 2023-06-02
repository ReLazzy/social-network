import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { Page, Router, RouterContext } from '@happysanta/router';
import { router } from './routes';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { useSelector } from 'react-redux';
import { useAppSelector } from './hooks/redux';
const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterContext.Provider value={router}>
      <ConfigProvider appearance="dark">
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </RouterContext.Provider>
  </Provider>
);
