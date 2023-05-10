import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/User/UserSlice';
import authReducer from './reducers/Auth/AuthSlice';
const rootReducer = combineReducers({
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
