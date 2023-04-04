import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateAccount from '../screens/AuthScreen/RegistrationScreen/CreateAccount';
import PasswordScreen from '../screens/AuthScreen/RegistrationScreen/PasswordScreen';
import EnterMobileNumber from '../screens/AuthScreen/RegistrationScreen/EnterMobileNumber';
import VerifyMobileNumber from '../screens/AuthScreen/RegistrationScreen/VerifyMobileNumber';
import VerifyPan from '../screens/AuthScreen/RegistrationScreen/VerifyPan';
import YourSelf from '../screens/AuthScreen/RegistrationScreen/YourSelf';
import Gender from '../screens/AuthScreen/RegistrationScreen/Gender';
import Occupation from '../screens/AuthScreen/RegistrationScreen/Occupation';
import Income from '../screens/AuthScreen/RegistrationScreen/Income';
import InvestorType from '../screens/AuthScreen/RegistrationScreen/InvestorType';
import TaxStatus from '../screens/AuthScreen/RegistrationScreen/TaxStatus';
import WelcomeUser from '../screens/AuthScreen/RegistrationScreen/WelcomeUser';

const RegistrationStack = createNativeStackNavigator();

const RegistrationNavigation = () => {
    return (
        <RegistrationStack.Navigator>
            <RegistrationStack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="PasswordScreen"
                component={PasswordScreen}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="EnterMobileNumber"
                component={EnterMobileNumber}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="VerifyMobileNumber"
                component={VerifyMobileNumber}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="VerifyPan"
                component={VerifyPan}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="YourSelf"
                component={YourSelf}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="Gender"
                component={Gender}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="Occupation"
                component={Occupation}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="Income"
                component={Income}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="InvestorType"
                component={InvestorType}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="TaxStatus"
                component={TaxStatus}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <RegistrationStack.Screen
                name="WelcomeUser"
                component={WelcomeUser}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </RegistrationStack.Navigator>
    )
}

export default RegistrationNavigation;