import React, { useCallback, useContext, useMemo, useState } from 'react';
import Screen from '../components/Screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../type';
import useChat from './useChat';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../modules/Color';
import Icon from '@react-native-vector-icons/material-design-icons';
import AuthContext from '../components/AuthContext';
import Message from './Message';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  membersSection: {},
  membersTitleText: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userProfile: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    backgroundColor: Colors.BLACK,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProfileText: {
    color: Colors.WHITE,
  },
  messageList: {
    flex: 1,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 1,
    marginRight: 10,
    borderRadius: 24,
    borderColor: Colors.BLACK,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  sendIcon: {
    color: Colors.WHITE,
    fontSize: 18,
  },
  messageSeperator: {
    height: 8,
  },
});

const disabledSendButtonStyle = [
  styles.sendButton,
  { backgroundColor: Colors.GRAY },
];

const ChatScreen = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, 'Chat'>>();
  const { other, userIds } = params;
  const { loadingChat, chat, sendMessage, messages, loadingMessages } =
    useChat(userIds);
  const [text, setText] = useState('');
  const { user: me } = useContext(AuthContext);
  const loading = loadingChat || loadingMessages;

  console.log('messages', messages);
  const sendDisabled = useMemo(() => text.length === 0, [text]);

  const onChangeText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const onPressSendButton = useCallback(() => {
    //TODO: send text message
    if (me != null) {
      sendMessage(text, me);
      setText('');
    }
  }, [me, sendMessage, text]);

  const renderChat = useCallback(() => {
    if (chat == null) {
      return null;
    }
    return (
      <View style={styles.chatContainer}>
        <View style={styles.membersSection}>
          <Text style={styles.membersTitleText}>대화상대</Text>
          <FlatList
            data={chat.users}
            renderItem={({ item: user }) => (
              <View style={styles.userProfile}>
                <Text style={styles.userProfileText}>{user.name[0]}</Text>
              </View>
            )}
            horizontal
          />
        </View>
        <FlatList
          inverted
          style={styles.messageList}
          data={messages}
          renderItem={({ item: message }) => {
            return (
              // <View>
              //   <Text>{message.user.name}</Text>
              //   <Text>{message.text}</Text>
              //   <Text>{message.createdAt.toISOString()}</Text>
              // </View>
              <Message
                name={message.user.name}
                text={message.text}
                createdAt={message.createdAt}
                isOtherMessage={message.user.userId !== me?.userId}
              />
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={styles.messageSeperator} />
          )}
        />
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={onChangeText}
              multiline
            />
          </View>
          <TouchableOpacity
            style={sendDisabled ? disabledSendButtonStyle : styles.sendButton}
            disabled={sendDisabled}
            onPress={onPressSendButton}>
            <Icon style={styles.sendIcon} name="send" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [
    chat,
    onChangeText,
    text,
    sendDisabled,
    onPressSendButton,
    messages,
    me?.userId,
  ]);

  return (
    <Screen title={other.name}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          renderChat()
        )}
      </View>
    </Screen>
  );
};

export default ChatScreen;
