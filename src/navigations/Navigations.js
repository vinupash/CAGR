import React, { useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigations from './AppNavigations';
import AuthNavigations from './AuthNavigations';

const Navigations = ({ }) => {

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            backgroundColor: 'transparent'
        }
    }

    return (
        <NavigationContainer theme={theme} independent={true}>
            {/* <AppNavigations /> */}
            <AuthNavigations />
        </NavigationContainer>
    )
}

export default Navigations
