import { createContext } from 'react';
import { User } from '../type';

export interface AuthContextProp {
  initialized: boolean;
  user: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  processingSignup: boolean;
  signin: (email: string, password: string) => Promise<void>;
  processingSignin: boolean;
  updateProfileImage: (filepath: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProp>({
  initialized: false,
  user: null,
  signup: async () => {},
  processingSignup: false,
  signin: async () => {},
  processingSignin: false,
  updateProfileImage: async () => {},
});

export default AuthContext;
