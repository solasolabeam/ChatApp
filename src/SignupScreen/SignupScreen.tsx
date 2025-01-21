import React, { useCallback, useMemo, useState } from 'react';
import Screen from '../components/Screen';
import validator from 'validator';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../modules/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    fontSize: 16,
  },
  errorText: {
    fontSize: 15,
    color: Colors.RED,
    marginTop: 4,
  },
});

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [name, setName] = useState('');

  const emailErrorText = useMemo(() => {
    if (email.length === 0) {
      return '이메일을 입력해주세요.';
    }
    if (!validator.isEmail(email)) {
      return '올바른 이메일이 아닙니다.';
    }
    return null;
  }, [email]);

  const passwordErrorText = useMemo(() => {
    if (password.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (password.length < 6) {
      return '비밀번호는 6자리 이상이여야합니다.';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요.';
    }
    return null;
  }, [password, confirmedPassword]);

  const confirmedPasswordErrorText = useMemo(() => {
    if (confirmedPassword.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (confirmedPassword.length < 6) {
      return '비밀번호는 6자리 이상이여야합니다.';
    }
    if (password !== confirmedPassword) {
      return '비밀번호를 확인해주세요.';
    }
    return null;
  }, [password, confirmedPassword]);

  const nameErrorText = useMemo(() => {
    if (name.length === 0) {
      return '이름을 입력해주세요';
    }
    return null;
  }, [name.length]);

  const onChangeEmailText = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const onChangePasswordText = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const onChangeConfirmPasswordText = useCallback((text: string) => {
    setConfirmedPassword(text);
  }, []);

  const onChangeNameText = useCallback((text: string) => {
    setName(text);
  }, []);
  return (
    <Screen title="회원가입">
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>이메일</Text>
          <TextInput
            value={email}
            style={styles.input}
            onChangeText={onChangeEmailText}
          />
          {emailErrorText && (
            <Text style={styles.errorText}>{emailErrorText}</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>비밀번호</Text>
          <TextInput
            value={password}
            style={styles.input}
            secureTextEntry
            onChangeText={onChangePasswordText}
          />
          {passwordErrorText && (
            <Text style={styles.errorText}>{passwordErrorText}</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>비밀번호 확인</Text>
          <TextInput
            value={confirmedPassword}
            style={styles.input}
            secureTextEntry
            onChangeText={onChangeConfirmPasswordText}
          />
          {confirmedPasswordErrorText && (
            <Text style={styles.errorText}>{confirmedPasswordErrorText}</Text>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>이름</Text>
          <TextInput
            value={name}
            style={styles.input}
            secureTextEntry
            onChangeText={onChangeNameText}
          />
          {nameErrorText && (
            <Text style={styles.errorText}>{nameErrorText}</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default SignupScreen;
