export interface AuthResponse {
  id: string;
  token: string;
  username: string;
  followers: string[];
  followings: string[];
}
export interface followResponse {
  followers: string[];
  followings: string[];
}
