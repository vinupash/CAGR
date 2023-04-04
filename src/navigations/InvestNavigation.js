import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invest from '../screens/AppScreen/Invest/Invest';
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
        </InvestStack.Navigator>
    )
}

export default InvestNavigation;