export type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
  Home: undefined;
  Loading: undefined;
  Chat: {
    userId: string[];
    other: User;
  };
};

export interface User {
  userId: string;
  email: string;
  name: string;
}

export enum Collections {
  USERS = 'users',
  CHATS = 'chats',
}

export interface Chat {
  id: string;
  userIds: string[];
  users: User[];
}
