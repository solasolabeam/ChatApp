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

const Message = ({ name, text, createdAt, isOtherMessage }: MessageProps) => {
  const renderMessageContainer = useCallback(() => {
    return (
      <>
        <Text style={styles.timeText}>{moment(createdAt).format('HH:mm')}</Text>
        <View style={styles.bubble}>
          <Text style={styles.messageText}>{text}</Text>
        </View>
      </>
    );
  }, [createdAt, text]);
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <View style={styles.messageContainer}>{renderMessageContainer()}</View>
    </View>
  );
};

export default Message;
