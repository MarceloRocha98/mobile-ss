import React from 'react'
import {NavigationContainer } from '@react-navigation/native'
import {createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'

import Signin from './Components/Signin/Signin'
import Signup from './Components/Signup/Signup'
import MainTab from './MainTab'

const Stack=createStackNavigator()

export default props => (
    <NavigationContainer>

    <Stack.Navigator initialRouteName={Signin}>
        <Stack.Screen  options={{
                // headerTransparent: true,
            headerShown:false,
               title:'Acesse a plataforma'
   
            }}
                name='Signin'
                component={Signin} />
            
            <Stack.Screen
                options=
                {{
                    // headerShown:false
                    headerTransparent: true,
                    title: ''
                }}
                name='Signup'
                component={Signup} />
            
            <Stack.Screen
                options={{headerShown:false}}
                name='MainTab'
                component={MainTab} />
    </Stack.Navigator>
    
    </NavigationContainer>

)