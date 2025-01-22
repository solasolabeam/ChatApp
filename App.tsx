/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './src/type';
import SignupScreen from './src/SignupScreen/SignupScreen';
import AuthProvider from './src/components/AuthProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Screen />
    </AuthProvider>
  );
};
export default App;
