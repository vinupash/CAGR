import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import eye from '../../../../assets/images/eye';
import Eyeoff from '../../../../assets/images/Eyeoff';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { SvgXml } from 'react-native-svg';
import { Input } from '../../../components/CustomInput';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { validatePanNum, validatePhoneNum } from '../../../constants/methods';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { ResendMobileOtpApi } from '../../../constants/AllApiCall';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const VerifyMobileNumber = ({ navigation, route }) => {
    const { user_id, user_mobile_no } = route.params;
    var hideMobileNumaber = user_mobile_no;
    var userMobilenumber = hideMobileNumaber.replace(/.(?=.{3})/g, '*');
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isOTP, setOTP] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [timer, setTimer] = useState(0);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    const [seconds, setSeconds] = useState(60);
    const timeOutCallback1 = useCallback(() => setSeconds(currTimer => currTimer - 1), []);
    useEffect(() => {
        seconds > 0 && setTimeout(timeOutCallback1, 1000);
    }, [seconds, timeOutCallback1]);

    // console.log(user_id, user_mobile_no);

    const handleErrorMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    const handleSuccessMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const ReSendOtp = async () => {
        setLoading(true)
        const response = await ResendMobileOtpApi(user_id, user_mobile_no);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            handleSuccessMsg()
            setSuccessMessage(response.message);
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    }

    const resetTimer = async () => {
        try {
            if (!timer) {
                setTimer(60);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const mobileNumberVerify = async () => {
        setLoading(true)
        const response = await ResendMobileOtpApi(user_id, isOTP);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            handleSuccessMsg()
            setSuccessMessage(response.message)
            navigation.navigate('VerifyPan', { user_id: user_id })
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}

            {isSuccessMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim, backgroundColor: COLORS.feedback.successBG
                }]}>
                    <Text style={[styles.snackbarText, { color: COLORS.feedback.success }]}>{isSuccessMessage}</Text>
                </Animated.View>
            )}
            <View style={[styles.topSection]}>
                <BackBtn onPress={navigation.goBack} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[styles.titleBox, {
                        width: '100%',
                        minHeight: 120,
                        marginTop: 10,
                        // borderWidth: 1,
                        marginBottom: 5
                    }]}>
                        <Text style={[styles.pageTitle, { textAlign: 'left' }]}>Verify your mobile {'\n'}number</Text>
                        <Text style={[styles.pageSubtitle, { textAlign: 'left' }]}>We have sent it to +91 {userMobilenumber}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        {/* <OTPInputView /> */}
                        <OTPInputView
                            style={{ width: windowWidth - 20, alignSelf: 'center', height: 100 }}
                            pinCount={6}
                            borderStyleBase
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                                setOTP(code)
                            })}
                            secureTextEntry={true}
                        />
                    </View>
                    <>
                        {seconds === 0 ?
                            <>
                                {timer === 0 ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            fontFamily: FONT.PlusJakartaSansRegular,
                                            fontSize: SIZES.font,
                                            color: COLORS.neutrals.thunder
                                        }}>Didn’t receive OTP? </Text>
                                        <TouchableOpacity
                                            style={{}}
                                            onPress={() => { resetTimer(); ReSendOtp() }}
                                        >
                                            <Text style={{
                                                color: COLORS.feedback.error,
                                                fontFamily: FONT.PlusJakartaSansSemiBold,
                                                fontSize: SIZES.font,
                                            }}>Resend</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <Text style={styles.inputLabelRight}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{timer}s</Text></Text>}
                            </>
                            :
                            <Text style={styles.inputLabelRight}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{seconds}s</Text></Text>
                        }
                    </>
                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Verify'
                    onPress={() => navigation.navigate('VerifyPan', { user_id: user_id })}
                // onPress={mobileNumberVerify}
                />
            </View>
        </SafeAreaView>
    )
}

export default VerifyMobileNumber

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    topSection: {
        flex: 6,
        width: windowWidth - 20,
        alignSelf: 'center'
    },
    bottomSectionPage: {
        flex: 0.8,
        justifyContent: 'center',
    },
    secureTextBox: {
        marginBottom: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
    },
    inputLabelRight: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.secondary,
        fontWeight: '600'
    },
    inputStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
        flex: 1
    },
    inputBox: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    snackbar: {
        backgroundColor: COLORS.feedback.errorBG,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        height: 45,
        padding: 5,
        justifyContent: 'center'
    },
    snackbarText: {
        color: COLORS.feedback.error,
        fontSize: SIZES.font,
        fontFamily: FONT.PlusJakartaSansRegular,
        textAlign: 'center'
    },
    secureTextBox: {
        marginBottom: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
    },
    inputLabelRight: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.secondary,
        fontWeight: '600'
    },
    textInputBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
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
    underlineStyleBase: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.feedback.success,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl
    },
})