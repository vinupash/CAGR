import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigations from './AppNavigations';
import AuthNavigations from './AuthNavigations';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';

const Navigations = ({ }) => {
    const { isLoading, userLoginStatus } = useContext(AuthContext)
    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            backgroundColor: 'transparent'
        }
    }

    // if (isLoading) {
    //     return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

    return (
        <NavigationContainer theme={theme} independent={true}>
            {userLoginStatus === true ? <AppNavigations /> : <AuthNavigations />}
            {/* <AppNavigations /> */}
            {/* <AuthNavigations /> */}
        </NavigationContainer>
    )
}

export default Navigations
