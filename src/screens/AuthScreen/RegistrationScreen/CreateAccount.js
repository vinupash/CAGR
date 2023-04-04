import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import eye from '../../../../assets/images/eye';
import Eyeoff from '../../../../assets/images/Eyeoff';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { SvgXml } from 'react-native-svg';
import { Input } from '../../../components/CustomInput';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { validateEmail } from '../../../constants/methods';
import { BASE_URL } from '../../../constants/api';
import { CreateAccountApi, ResendOtpApi, VerifyEmailOTPApi } from '../../../constants/AllApiCall';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CreateAccount = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [user_id, setUser_id] = useState('')
    const [isStatus, setStatus] = useState(false)
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [timer, setTimer] = useState(0);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);
    useEffect(() => {
        timer > 0 && setTimeout(timeOutCallback, 1000);
    }, [timer, timeOutCallback]);

    const [seconds, setSeconds] = useState(0);
    const timeOutCallback1 = useCallback(() => setSeconds(currTimer => currTimer - 1), []);
    useEffect(() => {
        seconds > 0 && setTimeout(timeOutCallback1, 1000);
    }, [seconds, timeOutCallback1]);

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

    const submitEmail = async () => {
        if (email.trim().length == 0 || !validateEmail(email)) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild email address');
            return
        }
        setLoading(true)
        const response = await CreateAccountApi(email);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            handleSuccessMsg()
            setSuccessMessage(response.message)
            setTimer(60)
            setStatus(response.status)
            setUser_id(response.user_id)
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

    const ReSendOtp = async () => {
        setLoading(true)
        const response = await ResendOtpApi(email);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            handleSuccessMsg()
            setSuccessMessage(response.message);
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

    const resetTimer = async () => {
        try {
            if (!timer) {
                setTimer(60);
            }
            console.log('resetTimer');
        } catch (error) {
            console.log(error.message);
        }
    };

    const verifyEmailOTP = async () => {
        setLoading(true)
        const response = await VerifyEmailOTPApi(user_id, otp);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            alert(response.message)
            navigation.navigate('PasswordScreen', { user_id: user_id })
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
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
                    <TitleSection
                        titleText='Let’s create your account'
                        subText=''
                    />
                    <Input
                        label='Email Address'
                        placeholder='Enter Email address'
                        value={email}
                        setValue={setEmail}
                        autoCapitalize='none'
                    />
                    {!isStatus ? null :
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.secureTextBox}>
                                <Text style={styles.inputLabel}>Enter OTP sent to this ID</Text>

                                {seconds === 0 ?
                                    <>
                                        {timer === 0 ?

                                            <TouchableOpacity
                                                style={{}}
                                                onPress={() => { resetTimer(); ReSendOtp() }}
                                            >
                                                <Text style={styles.inputLabelRight}>Didn’t receive OTP? <Text style={{ color: COLORS.brand.error }}>Resend</Text></Text>
                                            </TouchableOpacity>
                                            :
                                            <Text style={styles.inputLabelRight}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{timer}s</Text></Text>}
                                    </>
                                    :
                                    <Text style={styles.inputLabelRight}>Time Remaining <Text style={{ color: COLORS.brand.error }}>{seconds}s</Text></Text>
                                }
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Enter OTP"
                                    placeholderTextColor={COLORS.neutrals.thunder}
                                    secureTextEntry={secureTextEntry}
                                    value={otp}
                                    onChangeText={setOtp}
                                    keyboardType="number-pad"
                                    maxLength={5}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        setSecureTextEntry(!secureTextEntry);
                                        return false;
                                    }}
                                >
                                    {!secureTextEntry ? <SvgXml xml={Eyeoff} width={28} height={22} /> : <SvgXml xml={eye} width={28} height={22} />}
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>

                {!isStatus ?
                    <SecondaryBtn
                        btnText='Verify Email ID'
                        // onPress={() => navigation.navigate('PasswordScreen', { user_id: user_id })}
                        onPress={submitEmail}
                    />
                    :
                    <SecondaryBtn
                        btnText='Verify OTP'
                        // onPress={() => navigation.navigate('PasswordScreen')}
                        onPress={verifyEmailOTP}
                    />
                }

            </View>
        </SafeAreaView>
    )
}

export default CreateAccount

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
        height: 45,
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
})