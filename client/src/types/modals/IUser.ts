export interface IUser {
  username: string;
  email: string;
  name: string;
  lastname: string;
  password: string;
  birthday: Date;
  profilePicture?: string;
  coverPicture?: string;
  followers?: string[];
  followings?: string[];
  city?: string;
}
