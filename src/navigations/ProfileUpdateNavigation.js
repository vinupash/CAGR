import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddressDetails from '../screens/AuthScreen/ProfileUpdateScreen/AddressDetails';
import BankDetails from '../screens/AuthScreen/ProfileUpdateScreen/BankDetails';
import KYCDetails from '../screens/AuthScreen/ProfileUpdateScreen/KYCDetails';

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
        </ProfileUpdateStack.Navigator>
    )
}

export default ProfileUpdateNavigation