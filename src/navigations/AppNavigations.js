import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../screens/AppScreen/Dashboard';
import CustomDrawer from './CustomDrawer';
import BottomStack from './BottomTab'
import ProfileUpdateNavigation from './ProfileUpdateNavigation';
import DashboardStack from './DashboardNavigation';

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
        </Drawer.Navigator>
    )
}

export default AppNavigations