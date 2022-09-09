import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const Hometabs = () => {
    const screenOptions = {
        headerShown: false,
        tabBarStyle:{
          backgroundColor:'rgba(0,0,0,1)',
          borderColor: '#000'
          
        },
        // tabBarItemStyle:{
        //   backgroundColor:'rgba(0,0,0,.6)',
          
        // }
      };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} options={{  tabBarIcon: ({color, size}) => (
            <FontAwesome5 name="home" size={20} color={color}  />
          ), }} />
     <Tab.Screen name="Tools" component={Profile} options={{          
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
        <FontAwesome5 name="user-edit" size={20} color={color} />
          ),}}/>
  </Tab.Navigator>

  )
}

export default Hometabs