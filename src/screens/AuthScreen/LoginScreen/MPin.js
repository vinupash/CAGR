import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import TitleSection from '../../../components/TitleSection';
import { COLORS, FONT, SIZES } from '../../../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { MPinApi } from '../../../constants/AllApiCall';

const MPin = ({ navigation, route }) => {
    const { user_id, user_name } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isMPin, setMPin] = useState('')
    const fadeAnim = useRef(new Animated.Value(0)).current;

    console.log('isMPin--->', isMPin);
    console.log('user_id--->', user_id, user_name);

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

    const userLogin = async () => {
        if (!isMPin) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild M-Pin');
            return
        }

        const response = await MPinApi(user_id, isMPin);
        console.log('response--->', response);
        if (response.status === true) {
            alert(response.message);
            // navigation.navigate('MPin', {
            //     user_id: response.result.fldi_user_id,
            //     user_name: response.result.fldv_first_name
            // });
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

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

            <View style={[styles.topSection]}>
                <BackBtn onPress={navigation.goBack} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <TitleSection
                        titleText='Enter mPIN'
                        subText=''
                    />
                    <View style={{ alignItems: 'center' }}>
                        {/* <OTPInputView /> */}
                        <OTPInputView
                            style={{ width: windowWidth - 50, alignSelf: 'center', height: 100 }}
                            pinCount={4}
                            borderStyleBase
                            autoFocusOnLoad
                            codeInputFieldStyle={styles.underlineStyleBase}
                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                            onCodeFilled={(code => {
                                console.log(`Code is ${code}, you are good to go!`)
                                setMPin(code)
                            })}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={styles.bottomTextSection}>
                        <TouchableOpacity>
                            <Text style={styles.inputLabel}>Not {user_name}?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        // onPress={() => navigation.navigate('Dashboard')}
                        >
                            <Text style={styles.inputLabelRight}>Forgot mPIN?</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Log in'
                    onPress={userLogin}
                // onPress={() => navigation.navigate('MPin')}
                />
            </View>
        </SafeAreaView>
    )
}

export default MPin

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
    bottomTextSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
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