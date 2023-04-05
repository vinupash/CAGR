import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SecondaryBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import RegistrationComplete from '../../../../assets/images/RegistrationComplete';
import { SvgXml } from 'react-native-svg';
import { AuthContext } from '../../../context/AuthContext';

const RegistrationCompleted = ({ navigation, route }) => {
    const { GetDataAfterMPinStatus } = useContext(AuthContext)
    const { user_id, profile_update } = route.params;
    console.log(user_id, profile_update);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />

            <View style={styles.topSection}>
                <View style={styles.titleBox}>
                    <Text style={styles.pageTitle}>Registration Completed!</Text>
                    <Text style={styles.pageSubtitle}>We have succesfully completed the registration process. Enjoy trading!</Text>
                </View>
            </View>
            <View style={styles.midSection}>
                <View style={styles.registrationCompleteCircle}>
                    <SvgXml xml={RegistrationComplete} width={198} height={183} />
                </View>
            </View>
            <View style={styles.bottomSection}>
                {profile_update === true ?
                    <SecondaryBtn
                        btnText='Go back to Dashboard'
                        onPress={() => { GetDataAfterMPinStatus() }}
                    />
                    :
                    <SecondaryBtn
                        btnText='Go back to Dashboard'
                        onPress={() => navigation.navigate('DashboardStack', { screen: 'Dashboard' })}
                    />
                }
            </View>
        </SafeAreaView>
    )
}

export default RegistrationCompleted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.primary
    },
    bottomSection: {
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    topSection: {
        flex: 2,
        padding: 10,
    },
    midSection: {
        flex: 2,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleBox: {
        width: '100%',
        minHeight: 120,
        marginTop: 55,
        marginBottom: 20
    },
    pageTitle: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.neutrals.coconut,
        textAlign: 'left',
        letterSpacing: -0.4,
        lineHeight: 38,
    },
    pageSubtitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.neutrals.coconut,
        marginTop: 5
    },
    registrationCompleteCircle: {
        width: 216, height: 216,
        borderRadius: 216 / 2,
        backgroundColor: '#020F2F',
        justifyContent: 'center',
        alignItems: 'center', ...SHADOWS.light
    }
})