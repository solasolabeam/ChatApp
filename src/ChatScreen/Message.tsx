import moment from 'moment';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../modules/Color';

interface MessageProps {
  name: string;
  text: string;
  createdAt: Date;
  isOtherMessage: boolean;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
  nameText: {
    fontSize: 12,
    color: Colors.GRAY,
    marginBottom: 4,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: Colors.GRAY,
    marginRight: 4,
  },
  bubble: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 12,
  },
  messageText: {
    fontSize: 14,
    color: Colors.WHITE,
  },
});

const otherMessageStyles = {
  container: [styles.container, { alignItems: 'flex-start' as const }],
  bubble: [styles.bubble, { backgroundColor: Colors.LIGHT_GRAY }],
  messageText: [styles.messageText, { color: Colors.BLACK }],
  timeText: [styles.timeText, { marginRight: 0, marginLeft: 4 }],
};

const Message = ({ name, text, createdAt, isOtherMessage }: MessageProps) => {
  const messageStyles = isOtherMessage ? otherMessageStyles : styles;
  const renderMessageContainer = useCallback(() => {
    const component = [
      <Text key="textText" style={messageStyles.timeText}>
        {moment(createdAt).format('HH:mm')}
      </Text>,
      <View key="message" style={messageStyles.bubble}>
        <Text style={messageStyles.messageText}>{text}</Text>
      </View>,
    ];
    return isOtherMessage ? component.reverse() : component;
  }, [createdAt, text, messageStyles, isOtherMessage]);
  return (
    <View style={messageStyles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.messageContainer}>{renderMessageContainer()}</View>
    </View>
  );
};

export default Message;
