import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/AuthScreen/LoginScreen/Login';
import MPin from '../screens/AuthScreen/LoginScreen/MPin';

const LoginStack = createNativeStackNavigator();

const LoginNavigation = () => {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <LoginStack.Screen
                name="MPin"
                component={MPin}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </LoginStack.Navigator>
    )
}

export default LoginNavigation

