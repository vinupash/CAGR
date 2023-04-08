import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/AppScreen/Dashboard';
import CustomDrawer from './CustomDrawer';
import BottomStack from './BottomTab'
import ProfileUpdateNavigation from './ProfileUpdateNavigation';
import DashboardStack from './DashboardNavigation';
import InvestNavigation from './InvestNavigation';
import ReedeemNavigation from './ReedeemNavigation';
import SwitchNavigation from './SwitchNavigation';

const Drawer = createDrawerNavigator(); 'react'

const AppNavigations = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen
                name="Tab Screens"
                component={BottomStack}
            />
            <Drawer.Screen
                name="ProfileUpdateNavigation"
                component={ProfileUpdateNavigation}
            />
            {/* <Drawer.Screen
                name="DashboardStack"
                component={DashboardStack}
            /> */}
            <Drawer.Screen
                name="InvestStack"
                component={InvestNavigation}
            />
            <Drawer.Screen
                name="ReedeemStack"
                component={ReedeemNavigation}
            />

            <Drawer.Screen
                name="SwitchStack"
                component={SwitchNavigation}
            />
        </Drawer.Navigator>
    )
}

export default AppNavigations