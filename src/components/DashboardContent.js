import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import CustomSwitch from './CustomSwitch';
import { COLORS, SIZES, assets, FONT, SHADOWS } from '../constants';
import UpIcon from '../../assets/images/UpIcon';
import DownIcon from '../../assets/images/DownIcon';

const DashboardContent = () => {
    const [show, setShow] = useState(false);
    const [showMoreToggle, setShowMoreToggle] = useState(false);
    const [dashboardTab, setDashboardTab] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isVisible, setIsVisible] = useState(false);

    const onSelectSwitch = value => {
        setDashboardTab(value);
    };

    const handleShowSection = () => {
        setShow(!show)
        setShowMoreToggle(!showMoreToggle)
        Animated.timing(
            fadeAnim,
            {
                toValue: show ? 0 : 1,
                duration: 1000,
                useNativeDriver: true
            }
        ).start();
    };

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [animation] = useState(new Animated.Value(0));

    const toggleCollapse = () => {
        setShow(!show)
        setIsCollapsed(!isCollapsed);
        Animated.timing(animation, {
            toValue: isCollapsed ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 130],
    });

    const Equity = () => {
        return (
            <View style={styles.tabBox}>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Invested Value</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sectionValue}>₹10,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Current Value</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sectionValue}>₹10,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Total Return</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sectionValue, { color: '#14B81A' }]}>5.37%</Text>
                    </View>
                </View>
            </View>
        )
    }

    const Debt = () => {
        return (
            <View style={styles.tabBox}>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Invested Value</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.sectionValue}>₹11,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Current Value</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.sectionValue}>₹11,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Total Return</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sectionValue, { color: '#14B81A' }]}>5.37%</Text>
                    </View>
                </View>
            </View>
        )
    }

    const Liquid = () => {
        return (
            <View style={styles.tabBox}>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Invested Value</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.sectionValue}>₹12,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Current Value</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.sectionValue}>₹12,00,000</Text>
                    </View>
                </View>
                <View style={styles.tabBoxSection}>
                    <Text style={styles.sectionTitle}>Total Return</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sectionValue, { color: '#14B81A' }]}>5.37%</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 4.0 }}
            // locations={[0, 0.5, 0.6]}
            colors={[COLORS.brand.primary, COLORS.brand.secondary]}
            style={{ position: 'relative', paddingHorizontal: 10 }}
        >
            <View style={{
                flexDirection: 'row',
                flexWrap: "wrap",
                justifyContent: 'space-between',
                // paddingVertical: 14
                paddingBottom: show ? 5 : 10,

            }}>
                <View style={styles.valueBox}>
                    <Text style={styles.sectionTitle}>Current value</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.currencyValue}>₹17,15,546</Text>
                    </View>
                </View>
                <View style={styles.valueBox}>
                    <Text style={styles.sectionTitle}>Invested Value</Text>
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.sectionValue}>₹10,00,000</Text>
                    </View>
                </View>
                <View style={styles.valueBox}>
                    <Text style={styles.sectionTitle}>Total Return</Text>
                    {/* <Text style={styles.sectionValue}>5.37%</Text> */}
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sectionValue]}>5.37%</Text>
                        {/* <PercentIcon
                            name="percent"
                            type="FontAwesome"
                            style={[styles.sectionValue, { marginLeft: 2, lineHeight: 28, color: '#F5F6F9', fontSize: 14 }]}
                        /> */}
                    </View>
                </View>
                <View style={styles.valueBox}>
                    <Text style={styles.sectionTitle}>XIRR</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[styles.sectionValue, { color: '#14B81A' }]}>5.37%</Text>
                        {/* <PercentIcon
                            name="percent"
                            type="FontAwesome"
                            style={[styles.sectionValue, { marginLeft: 2, lineHeight: 28, color: '#14B81A', fontSize: 14 }]}
                        /> */}
                    </View>
                </View>
            </View>


            <Animated.View style={{ height }}>
                <View style={{
                    height: 0.8,
                    backgroundColor: 'rgba(255, 255, 255 ,0.3)',
                    alignSelf: 'stretch'
                }} />
                <View style={[styles.showBox]}>
                    {show ?
                        <>
                            <CustomSwitch
                                selectionMode={1}
                                option1="Equity"
                                option2="Debt"
                                option3="Liquid"
                                onSelectSwitch={onSelectSwitch}
                            />
                        </> : null}
                    <View>
                        {dashboardTab == 1 && <Equity />}
                        {dashboardTab == 2 && <Debt />}
                        {dashboardTab == 3 && <Liquid />}
                    </View>
                </View>
            </Animated.View>

            <TouchableOpacity
                onPress={() => {
                    toggleCollapse()
                }}
                style={styles.collapseArrow}
            >
                <SvgXml xml={isCollapsed ? DownIcon : UpIcon} width={12} height={8} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DashboardContent

const styles = StyleSheet.create({
    collapseIcon: {
        fontSize: SIZES.large,
        color: COLORS.neutrals.thunder
    },
    sectionTitle: {
        fontSize: SIZES.base,
        color: COLORS.neutrals.thunder,
        fontFamily: FONT.PlusJakartaSansRegular,
        paddingBottom: 2
    },
    sectionValue: {
        fontSize: SIZES.font,
        color: '#F5F6F9',
        lineHeight: 24,
        fontFamily: FONT.PlusJakartaSansSemiBold,
    },
    showBox: {
        paddingTop: 15,
        // paddingBottom: 20,
        height: 130
    },
    valueBox: {
        width: '50%',
        height: 60,
        padding: 6,
    },
    collapseArrow: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -16,
        backgroundColor: COLORS.neutrals.platinum,
        ...SHADOWS.light,
        justifyContent: 'center',
        alignItems: 'center'
    },
    currencyValue: {
        fontSize: 20,
        color: '#14B81A',
        lineHeight: 24,
        fontFamily: FONT.PlusJakartaSansSemiBold,
    },
    tabBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginTop: 10,
    },
    tabBoxSection: {
        width: '32%',
        padding: 6,
        // alignItems: 'center'
    },
})