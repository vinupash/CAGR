import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated, Image, Button, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import MenuIcon from '../../../assets/images/MenuIcon';
import DashboardContent from '../../components/DashboardContent';
import UserUnderReview from '../../components/UserUnderReview';
import { COLORS, FONT, SIZES, SHADOWS, assets } from '../../constants';
import { GetUserDataApi } from '../../constants/AllApiCall';
import UserRegistrationDetail from '../../navigations/UserRegistrationDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Invest from '../../../assets/images/Invest';
import Reedeem from '../../../assets/images/Reedeem';
import Switch from '../../../assets/images/Switch';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Dashboard = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [user_id, setUser_id] = useState('');
    const [userApprovalStatus, setUserApprovalStatus] = useState('');
    const [userFlagStatus, setUserFlagStatus] = useState('');
    const [userApprovalStatus_1, setUserApprovalStatus_1] = useState('');
    const [userApprovalStatus_2, setUserApprovalStatus_2] = useState('');

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const userDataAfterMPin = await AsyncStorage.getItem("userDataAfterMPin");
            const transformedUserLoginData = JSON.parse(userDataAfterMPin);
            console.log(transformedUserLoginData);
            setUser_id(transformedUserLoginData.user_id)
            const userid = transformedUserLoginData.user_id;
            const response = await GetUserDataApi(userid);
            setLoading(false)
            // console.log('response--->', response);
            if (response.status === "success") {
                setUserApprovalStatus(response.result.flg_app_status)
                setUserApprovalStatus_1(response.result.fldi_approval1)
                setUserApprovalStatus_2(response.result.fldi_approval2)
                setUserFlagStatus(response.result.flg_status)
            } else {
                console.log(response.message);
            }

        };
        fetchDataAsync();
    }, []);

    // console.log('--->', userApprovalStatus, userFlagStatus, userApprovalStatus_1, userApprovalStatus_2);
    const HeaderBar = () => {
        return (
            <View style={styles.headerSection}>
                <View style={styles.headerBox}>
                    <View
                        style={styles.menuBox}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.openDrawer()}
                        >
                            <SvgXml xml={MenuIcon} width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerBoxTitle}>My Dashboard</Text>
                    </View>
                    <View>
                        <Image source={assets.UserImage} style={{ width: 24, height: 24 }} />
                    </View>
                </View>
            </View>
        )
    }

    const boxNavigationArray = [
        {
            key: '1',
            title: 'Invest',
            screenName: 'Invest',
            mainStackName: 'InvestStack',
            iconName: Invest
        },
        {
            key: '2',
            title: 'Reedeem',
            screenName: 'Reedeem',
            mainStackName: 'ReedeemStack',
            iconName: Reedeem
        },
        {
            key: '3',
            title: 'Switch',
            screenName: 'Switch',
            mainStackName: 'SwitchStack',
            iconName: Switch
        },
    ];

    const NavigationScreenData = () => {
        return boxNavigationArray.map((NavigationInfoData, i) => {
            return (
                <Pressable
                    style={styles.navigationBox}
                    key={NavigationInfoData.key}
                    // onPress={() => { navigation.navigate(NavigationInfoData.screenName) }}
                    onPress={() => { navigation.navigate(NavigationInfoData.mainStackName, { screen: NavigationInfoData.screenName }) }}
                >
                    <SvgXml xml={NavigationInfoData.iconName} width={40} height={40} />
                    <Text style={styles.navigationTitle}>{NavigationInfoData.title}</Text>
                </Pressable>
            )
        })
    }

    const boxNavigation = () => {
        return (
            <View style={styles.boxNavigationSection}>
                {NavigationScreenData()}
            </View>
        )
    }

    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {HeaderBar()}
            {userApprovalStatus === '2' ?
                <>
                    {
                        userFlagStatus > 0 && userApprovalStatus_1 > 0 && userApprovalStatus_2 > 0 ?
                            <>
                                <DashboardContent />
                                <View style={{
                                    marginTop: 25
                                }}>
                                    {boxNavigation()}
                                </View>
                                {/* <HoldingsDetails /> */}
                            </>
                            :
                            (
                                <UserUnderReview />
                            )
                    }
                </>
                :
                (<UserRegistrationDetail
                    onPress={() => navigation.navigate('ProfileUpdate', {
                        screen: 'Address Details',
                        params: {
                            user_id: user_id,
                            profile_update: false
                        }
                    })}
                />)}

            {/* <UserRegistrationDetail
                onPress={() => navigation.navigate('ProfileUpdateNavigation', {
                    screen: 'Address Details',
                    params: {
                        user_id: user_id,
                        profile_update: false
                    }
                })}
            /> */}

        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6F9'
    },
    headerSection: {
        backgroundColor: COLORS.brand.primary,
    },
    headerBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: windowWidth - 20,
        alignSelf: 'center'
    },
    menuBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerBoxTitle: {
        marginLeft: 10,
        fontSize: SIZES.large,
        lineHeight: 24,
        color: COLORS.neutrals.thunder,
        fontFamily: FONT.PlusJakartaSansBold,
    },
    boxNavigationSection: {
        // marginTop: 25,
        width: windowWidth - 20,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    navigationBox: {
        marginBottom: 5,
        width: '31%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: COLORS.neutrals.coconut,
        ...SHADOWS.light
    },
    navigationTitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        color: COLORS.neutrals.charcoal,
    },
})