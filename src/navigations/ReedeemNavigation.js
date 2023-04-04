import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Invest from '../screens/AppScreen/Invest/Invest';
import Switch from '../screens/AppScreen/Switch/Switch';
import Reedeem from '../screens/AppScreen/Reedeem/Reedeem';
const InvestStack = createNativeStackNavigator();
const ReedeemNavigation = () => {
    return (
        <InvestStack.Navigator>
            <InvestStack.Screen
                name="Reedeem"
                component={Reedeem}
                options={{
                    headerShown: false,
                    animation: 'slide_from_right'
                }}
            />
        </InvestStack.Navigator>
    )
}

export default ReedeemNavigation;