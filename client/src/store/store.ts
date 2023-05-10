import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/User/UserSlice';
import authReducer from './reducers/Auth/AuthSlice';
import friendsReducer from './reducers/Friends/FriendSlice';
const rootReducer = combineReducers({
  friendsReducer,
  userReducer,
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
