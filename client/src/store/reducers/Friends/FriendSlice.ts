import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  FriendType,
  FriendsResponse,
} from '../../../types/modals/friendsResponse';
import { fetchFrends } from './FriendActionCreator';

interface FriendsState {
  friendlist: FriendType[];
  isLoading: boolean;
  error: string;
}

const initialState: FriendsState = {
  friendlist: [],
  isLoading: false,
  error: '',
};

export const friendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFrends.pending.type](state) {
      state.isLoading = true;
    },
    [fetchFrends.fulfilled.type](state, action: PayloadAction<FriendType[]>) {
      state.friendlist = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    [fetchFrends.rejected.type](state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default friendSlice.reducer;
