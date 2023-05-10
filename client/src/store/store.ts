import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/User/UserSlice';
import authReducer from './reducers/Auth/AuthSlice';
import friendsReducer from './reducers/Friends/FriendSlice';
import uploadReducer from './reducers/Upload/UploadSlice';
import postReducer from './reducers/Post/PostSlice';
const rootReducer = combineReducers({
  postReducer,
  uploadReducer,
  friendsReducer,
  userReducer,
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
