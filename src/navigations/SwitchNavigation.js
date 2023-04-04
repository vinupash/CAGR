import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invest from '../screens/AppScreen/Invest/Invest';
import Switch from '../screens/AppScreen/Switch/Switch';
const InvestStack = createNativeStackNavigator();
const SwitchNavigation = () => {
    return (
        <InvestStack.Navigator>
            <InvestStack.Screen
                name="Switch"
                component={Switch}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </InvestStack.Navigator>
    )
}

export default SwitchNavigation;