import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStartedScreen from './Screens/Started';
import SignUpScreen from './Screens/Signup';
import VerificationPendingScreen from './Screens/VerficationPendingScreen';
import LoginScreen from './Screens/Signin';
import HomeScreen from './Screens/HomePage';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DTRACK" component={GetStartedScreen} options={{
          headerStyle: {
            backgroundColor: '#5c5de5', // Background color of the header
          },
          headerTintColor: 'white', // Text color of the header
        }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="verification" component={VerificationPendingScreen} />
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}



