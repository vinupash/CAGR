import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddressDetails from '../screens/AuthScreen/ProfileUpdateScreen/AddressDetails';
import BankDetails from '../screens/AuthScreen/ProfileUpdateScreen/BankDetails';
import KYCDetails from '../screens/AuthScreen/ProfileUpdateScreen/KYCDetails';
import NomineeDetails from '../screens/AuthScreen/ProfileUpdateScreen/NomineeDetails';
import Documents from '../screens/AuthScreen/ProfileUpdateScreen/Documents';
import RegistrationCompleted from '../screens/AuthScreen/ProfileUpdateScreen/RegistrationCompleted';

const ProfileUpdateStack = createNativeStackNavigator();

const ProfileUpdateNavigation = () => {
    return (
        <ProfileUpdateStack.Navigator>
            <ProfileUpdateStack.Screen
                name="Address Details"
                component={AddressDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <ProfileUpdateStack.Screen
                name="Bank Details"
                component={BankDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <ProfileUpdateStack.Screen
                name="KYCDetails"
                component={KYCDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <ProfileUpdateStack.Screen
                name="NomineeDetails"
                component={NomineeDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <ProfileUpdateStack.Screen
                name="Documents"
                component={Documents}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <ProfileUpdateStack.Screen
                name="Registration Completed"
                component={RegistrationCompleted}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </ProfileUpdateStack.Navigator>
    )
}

export default ProfileUpdateNavigation