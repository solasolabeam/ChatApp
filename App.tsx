/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useCallback, useContext } from 'react';
import { RootStackParamList } from './src/type';
import SignupScreen from './src/SignupScreen/SignupScreen';
import AuthProvider from './src/components/AuthProvider';
import SigninScreen from './src/SigninScreen/SiginScreen';
import AuthContext from './src/components/AuthContext';
import HomeScreen from './src/HomeScreen/HomeScreen';
import LoadingScreen from './src/LoadingScreen/LoadingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screen = () => {
  const { user, processingSignin, processingSignup, initialized } =
    useContext(AuthContext);
  const renderRootStack = useCallback(() => {
    if (!initialized) {
      return <Stack.Screen name="Loading" component={LoadingScreen} />;
    }
    if (user != null && !processingSignin && !processingSignup) {
      // login
      return <Stack.Screen name="Home" component={HomeScreen} />;
    }
    // logout
    return (
      <>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
      </>
    );
  }, [user, processingSignin, processingSignup, initialized]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {renderRootStack()}
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
