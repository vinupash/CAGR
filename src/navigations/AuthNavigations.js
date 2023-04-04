import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/AuthScreen/SplashScreen';
import Welcome from '../screens/AuthScreen/Welcome';
import Policy from '../screens/AuthScreen/Policy';
import LoginNavigation from './LoginNavigation';
import RegistrationNavigation from './RegistrationNavigation';
import ProfileUpdateNavigation from './ProfileUpdateNavigation';

const Stack = createNativeStackNavigator();
const AuthNavigations = () => {

    const [isSplashScreen, setSplashScreen] = React.useState(true);
    React.useEffect(() => {
        setInterval(() => {
            setSplashScreen(false)
        }, 4000);
    }, [])

    return (
        <Stack.Navigator>
            {isSplashScreen ?
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                        animation: 'fade'
                    }}
                /> : null
            }

            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />

            <Stack.Screen
                name="Policy"
                component={Policy}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />

            <Stack.Screen
                name="LoginNavigation"
                component={LoginNavigation}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />

            <Stack.Screen
                name="RegistrationNavigation"
                component={RegistrationNavigation}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />

            <Stack.Screen
                name="ProfileUpdateNavigation"
                component={ProfileUpdateNavigation}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigations