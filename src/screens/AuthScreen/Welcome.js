import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GoogleIcon from '../../../assets/images/GoogleIcon';
import Icon from '../../../assets/images/Icon';
import { PrimaryBtn, SecondaryBtn } from '../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <View style={{ flex: 4, justifyContent: 'space-between', alignItems: 'center' }} >
                <View style={[styles.logoSection, { marginTop: 78, }]}>
                    <SvgXml xml={Icon} width={40} height={40} />
                    <Text style={styles.logoName}>CAGRfunds</Text>
                </View>
                <View style={styles.textSection}>
                    <Text style={styles.pageTitle}>Investing – Simplified & Personalized For You</Text>
                    <Text style={styles.pageSubtitle}>we help you invest in the best mutual {'\n'}funds and choose the right {'\n'}investment solutions for your future.</Text>
                </View>
                <View style={styles.btnSection}>
                    <SecondaryBtn
                        btnText='Log in with Email'
                        onPress={() => navigation.navigate('LoginNavigation')}
                    />
                </View>
            </View>
            <View style={styles.bottomSection}>
                <View style={styles.hrLine} />
                <Text style={styles.smallText}>New User?</Text>
                <View style={{
                    marginBottom: 14,
                    // width: windowWidth - 30,
                    alignItems: 'center'
                }}>
                    <PrimaryBtn
                        btnText='Create new account'
                        onPress={() => navigation.navigate('RegistrationNavigation')}
                    />
                </View>
                <View style={{
                    marginBottom: 10,
                    // width: windowWidth - 30,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={styles.transparentBtn}

                    >
                        <SvgXml xml={GoogleIcon} width={20} height={20} />
                        <Text style={styles.transparentBtnText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.termsText}>By proceeding, I accept the</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Policy')}
                    >
                        <Text style={[styles.termsText, { color: COLORS.brand.secondary, paddingLeft: 4 }]}>T&C, Privacy Policy & Tariff rates</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    bottomSection: {
        flex: 2,
        // width: width - 20,
        alignItems: 'center',
        width: '100%'
    },
    hrLine: {
        width: windowWidth - 20,
        borderTopWidth: 0.8,
        marginTop: 20,
        borderTopColor: '#DDDDDD'
    },
    smallText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.base,
        color: COLORS.neutrals.thunder,
        fontWeight: '400',
        lineHeight: 14,
        marginBottom: 8
    },
    termsText: {
        textAlign: 'center',
        marginTop: 10,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.base,
        color: COLORS.neutrals.thunder,
        fontWeight: '400',
        lineHeight: 14,
        marginBottom: 8
    },
    transparentBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: windowWidth - 20,
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.neutrals.thunder
    },
    transparentBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.thunder,
        lineHeight: 18,
        fontWeight: '400',
        marginLeft: 8
    },
    logoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoName: {
        marginLeft: 5,
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        letterSpacing: -0.2,
        color: COLORS.brand.primary
    },
    pageTitle: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.primary,
        textAlign: 'center',
        letterSpacing: -0.4,
        lineHeight: 38,
    },
    pageSubtitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'center',
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
        marginTop: 24
    },
})