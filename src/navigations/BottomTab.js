import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../assets/images/Home';
import HomeActive from '../../assets/images/HomeActive';
import { COLORS, SIZES, FONT } from '../constants';
import CAGRBasket from '../screens/AppScreen/CAGRBasket';
import Dashboard from '../screens/AppScreen/Dashboard';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ShoppingBagActive from '../../assets/images/ShoppingBagActive';
import ShoppingBag from '../../assets/images/ShoppingBag';
import DashboardStack from './DashboardNavigation';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName='DashboardStack'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: COLORS.brand.primary,
                    height: 56
                }
            }}
        >
            <Tab.Screen
                name="DashboardStack"
                component={DashboardStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            {focused ? <SvgXml xml={HomeActive} width={20} height={20} /> : <SvgXml xml={Home} width={20} height={20} />}
                            <Text style={{
                                color: focused ? '#F5F6F9' : COLORS.neutrals.thunder,
                                marginTop: 2,
                                fontFamily: FONT.PlusJakartaSansRegular,
                                fontSize: SIZES.base
                            }}>Home</Text>
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen name="Home" component={Dashboard} /> */}
            <Tab.Screen
                name="CAGR Basket"
                component={CAGRBasket}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: "center" }}>
                            {focused ? <SvgXml xml={ShoppingBagActive} width={20} height={20} /> : <SvgXml xml={ShoppingBag} width={20} height={20} />}
                            <Text style={{
                                color: focused ? '#F5F6F9' : COLORS.neutrals.thunder,
                                marginTop: 2,
                                fontFamily: FONT.PlusJakartaSansRegular,
                                fontSize: SIZES.base
                            }}>CAGR Basket</Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTab;