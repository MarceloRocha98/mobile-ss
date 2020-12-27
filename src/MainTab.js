import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Components/Home'
import {Ionicons } from '@expo/vector-icons'
import 'react-native-gesture-handler'

const Tab = createBottomTabNavigator()

export default props => (
    
    <Tab.Navigator
    // tabBarOptions={{
    //     activeTintColor: 'tomato',
    //     inactiveTintColor: 'gray',
    
    //   }}
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return (
              <Ionicons
                name={
                  focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline'
                }
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Settings') {
            return (
              <Ionicons
                name={focused ? 'ios-list-box' : 'ios-list'}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >

        <Tab.Screen
           
            name='Home' component={Home} />
        <Tab.Screen
           
            name='Home' component={Home} />
         
    </Tab.Navigator>
)