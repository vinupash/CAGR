import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invest from '../screens/AppScreen/Invest/Invest';
import InvestDetails from '../screens/AppScreen/Invest/InvestDetails';
import InvestFund from '../screens/AppScreen/Invest/InvestFund';
import InvestFundDetails from '../screens/AppScreen/Invest/InvestFundDetails';
const InvestStack = createNativeStackNavigator();
const InvestNavigation = () => {
    return (
        <InvestStack.Navigator>
            <InvestStack.Screen
                name="Invest"
                component={Invest}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <InvestStack.Screen
                name="Invest Details"
                component={InvestDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <InvestStack.Screen
                name="Invest Fund"
                component={InvestFund}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
            <InvestStack.Screen
                name="Invest Fund Details"
                component={InvestFundDetails}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </InvestStack.Navigator>
    )
}

export default InvestNavigation;