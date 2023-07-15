import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { checkChats } from './ChatsActionCreator';
import { ChatsResponse } from '../../../services/ChatsService';

interface ChatsState {
  unreadChats: string[];
  isLoading: boolean;
  error: string;
}

const initialState: ChatsState = {
  unreadChats: [],
  isLoading: false,
  error: '',
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    addChats(state, action: PayloadAction<string>) {
       
      !state.unreadChats.includes(action.payload) &&
        state.unreadChats.push(action.payload);
    },
    deleteChats(state, action: PayloadAction<string>) {
      if (state.unreadChats.includes(action.payload)) {
        state.unreadChats = [
          ...state.unreadChats.filter((item) => item !== action.payload),
        ];
      }
    },
  },
  extraReducers: {
    [checkChats.pending.type](state) {
      state.isLoading = true;
      console.log(123)
    },
    [checkChats.fulfilled.type](state, action: PayloadAction<ChatsResponse>) {
      state.isLoading = false;
      console.log(12)
      state.unreadChats =action.payload.chats;
      
      state.error = '';
    },
    [checkChats.rejected.type](state) {
    console.log(1)
      state.isLoading = false;
      state.error = 'not found ';
    },
  },
});

export default chatsSlice.reducer;
