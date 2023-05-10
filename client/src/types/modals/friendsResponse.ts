export interface FriendsResponse {
  friendslist: FriendType[];
}

export interface FriendType {
  _id: string;
  username: string;
  name: string;
  lastname: string;
  profilePicture: string;
}
