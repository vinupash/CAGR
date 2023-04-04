import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/AppScreen/Dashboard';
import InvestStack from './InvestNavigation';
import ReedeemStack from './ReedeemNavigation';
import SwitchStack from './SwitchNavigation';
const DashboardStack = createNativeStackNavigator();
const DashboardNavigation = () => {
    return (
        <DashboardStack.Navigator>
            <DashboardStack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <DashboardStack.Screen
                name="InvestStack"
                component={InvestStack}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <DashboardStack.Screen
                name="ReedeemStack"
                component={ReedeemStack}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <DashboardStack.Screen
                name="SwitchStack"
                component={SwitchStack}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigation;