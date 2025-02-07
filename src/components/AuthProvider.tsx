import { useCallback, useEffect, useMemo, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Collections, User } from '../type';
import AuthContext from './AuthContext';
import React from 'react';
import _ from 'lodash';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [processingSignup, setProcessingSignup] = useState(false);
  const [processingSignin, setProcessingSignin] = useState(false);

  useEffect(() => {
    const unsubsribe = auth().onUserChanged(async fbUser => {
      if (fbUser != null) {
        //login
        setUser({
          userId: fbUser.uid,
          email: fbUser.email ?? '',
          name: fbUser.displayName ?? '',
        });
      } else {
        //logout
        setUser(null);
      }
      setInitialized(true);
    });
    return () => {
      unsubsribe();
    };
  }, []);

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setProcessingSignup(true);
      try {
        const { user: currentUser } =
          await auth().createUserWithEmailAndPassword(email, password);
        await currentUser.updateProfile({ displayName: name });
        await firestore()
          .collection(Collections.USERS)
          .doc(currentUser.uid)
          .set({
            userId: currentUser.uid,
            email,
            name,
          });
      } finally {
        setProcessingSignup(false);
      }
    },
    [],
  );

  const signin = useCallback(async (email: string, password: string) => {
    try {
      setProcessingSignin(true);
      await auth().signInWithEmailAndPassword(email, password);
    } finally {
      setProcessingSignin(false);
    }
  }, []);

  const updateProfileImage = useCallback(
    async (filepath: string) => {
      //TODO 업로드 이미지
      const filename = _.last(filepath.split('/'));
      if (user == null) {
        throw new Error('User is undefined');
      }
      if (filename == null) {
        throw new Error('filename is undefined');
      }

      const storageFilepath = `user/${user.userId}/${filename}`;
      await storage().ref(storageFilepath).putFile(filepath);
      const url = await storage().ref(storageFilepath).getDownloadURL();
      await auth().currentUser?.updateProfile({ photoURL: url });
      await firestore().collection(Collections.USERS).doc(user.userId).update({
        profileUrl: url,
      });
      //TODO 유저 프로필 사진 등록
    },
    [user],
  );

  const value = useMemo(() => {
    return {
      initialized,
      user,
      signup,
      processingSignup,
      signin,
      processingSignin,
      updateProfileImage,
    };
  }, [
    initialized,
    user,
    signup,
    processingSignup,
    signin,
    processingSignin,
    updateProfileImage,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
