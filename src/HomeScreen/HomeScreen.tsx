import React, { useContext } from 'react';
import Screen from '../components/Screen';
import AuthContext from '../components/AuthContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../modules/Color';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.BLACK,
  },
  userSectionContent: {
    backgroundColor: Colors.BLACK,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  myProfile: {
    flex: 1,
  },
  myNameText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  myEmailText: {
    marginTop: 4,
    color: Colors.WHITE,
    fontSize: 14,
  },
  logoutText: {
    color: Colors.WHITE,
    fontSize: 14,
  },
});

const HomeScreen = () => {
  const { user: me } = useContext(AuthContext);

  if (me == null) {
    return null;
  }
  return (
    <Screen title="홈">
      <View style={styles.container}>
        <Text style={styles.sectionTitleText}>나의 정보</Text>
        <View style={styles.userSectionContent}>
          <View style={styles.myProfile}>
            <Text style={styles.myNameText}>{me.name}</Text>
            <Text style={styles.myEmailText}>{me.email}</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.logoutText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;
