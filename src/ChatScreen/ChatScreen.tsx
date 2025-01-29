import React from 'react';
import Screen from '../components/Screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../type';

const ChatScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { other } = params;
  console.log('params', params);
  return <Screen title={other.name} />;
};

export default ChatScreen;
