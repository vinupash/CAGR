import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../constants';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import Close from '../../assets/images/Close';
import Icon from '../../assets/images/Icon';
import Logout from '../../assets/images/Logout';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = ({ props, navigation }) => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.brand.primary }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: COLORS.brand.primary
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.closeDrawer()}
                    >
                        <SvgXml xml={Close} width={28} height={28} />
                    </TouchableOpacity>
                    <View style={styles.logoSection}>
                        <SvgXml xml={Icon} width={30} height={30} />
                        <Text style={styles.logoName}>CAGRfunds</Text>
                    </View>
                </View>

                <View style={{ flex: 1, backgroundColor: COLORS.brand.primary, marginTop: 20, }}>
                    <DrawerItem
                        label="My dashboard"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('DashboardStack') }}
                        style={styles.menuItem}

                    />
                    <DrawerItem
                        label="Investment summary"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('Investment Summary') }}
                        style={styles.menuItem}
                    />
                    <DrawerItem
                        label="Transact"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('Home') }}
                        style={styles.menuItem}
                    />
                    <DrawerItem
                        label="Tools"
                        labelStyle={styles.menuLabel}
                        // onPress={() => { navigation.navigate('Home') }}
                        style={styles.menuItem}
                        inactiveBackgroundColor={COLORS.brand.black}
                    />
                    <View>
                        <TouchableOpacity style={{ height: 35, justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={styles.subMenu}>SIP calculator</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 35, justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={styles.subMenu}>Risk profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 35, justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={styles.subMenu}>Asset allocation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 35, justifyContent: 'center', paddingHorizontal: 20 }}>
                            <Text style={styles.subMenu}>Invite friends</Text>
                        </TouchableOpacity>
                    </View>
                    <DrawerItem
                        label="Company profile"
                        labelStyle={styles.menuLabel}
                        // onPress={() => { navigation.navigate('Home') }}
                        style={styles.menuItem}
                    />
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                // onPress={() => { userLogout() }}
                style={styles.logoutBtn}>
                <Text style={styles.logoutBtnText}>Logout</Text>
                <SvgXml xml={Logout} width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    logoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16
    },
    logoName: {
        marginLeft: 5,
        fontFamily: FONT.PlusJakartaSansSemiBold,
        fontSize: 20,
        letterSpacing: -0.2,
        color: '#F5F6F9',
        lineHeight: 21
    },
    menuLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.pearl,
        lineHeight: 18
    },
    menuItem: {
        paddingHorizontal: 20,
        marginHorizontal: null,
        marginVertical: null,
        paddingVertical: null,
        borderRadius: 0,
        height: 45
    },
    logoutBtnText: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.pearl,
        marginRight: 8, lineHeight: 18,
        marginLeft: 6
    },
    logoutBtn: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    subMenu: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        color: COLORS.neutrals.thunder,
        paddingLeft: 10
    }
})