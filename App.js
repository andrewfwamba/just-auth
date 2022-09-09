import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import Signup from './screens/Signup';
import UploadImage from './screens/Uploadimage';
import Hometabs from './components/Hometabs';
import { useEffect } from 'react';
import { auth } from './firebase';

const Stack = createNativeStackNavigator();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5B5197',
  },
};

useEffect(()=>{
  const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
          
      }
  })
  return unsubscribe;
})

export default function App() {
  return (
    <NavigationContainer theme={customTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}}name="Signup" component={Signup} />
        <Stack.Screen options={{headerShown: false}}name="Upload" component={UploadImage} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Hometabs" component={Hometabs} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
