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
import { MobileNumberApi } from '../../../constants/AllApiCall';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const EnterMobileNumber = ({ navigation, route }) => {
    const { user_id } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    console.log('user_id--->', user_id);

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

    const verifyMobileNumber = async () => {
        if (mobileNumber.trim().length < 10 || !validatePhoneNum(mobileNumber)) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild mobile number');
            return
        }
        setLoading(true)
        const response = await MobileNumberApi(user_id, mobileNumber);
        setLoading(false)
        console.log('response --->', response);
        if (response.status === true) {
            alert(response.message)
            handleSuccessMsg()
            setSuccessMessage(response.message)
            navigation.navigate('VerifyMobileNumber', { user_id: user_id, user_mobile_no: mobileNumber })
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
            // navigation.navigate('EnterMobileNumber')
        }
    }

    var hideMobileNumaber = mobileNumber; //VERY BAD: Credit Card # *unencrypted* in source!
    var userMobilenumbaer = hideMobileNumaber.replace(/.(?=.{3})/g, '*');
    console.log(userMobilenumbaer);

    // if (isLoading) {
    //     return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    // }

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
                        <Text style={[styles.pageTitle, { textAlign: 'left' }]}>Enter mobile number</Text>
                        <Text style={[styles.pageSubtitle, { textAlign: 'left' }]}>We have sent it to +91 {userMobilenumbaer}</Text>
                    </View>
                    <>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Mobile number</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <View style={styles.textInputBox}>
                            <Text style={{
                                fontFamily: FONT.PlusJakartaSansRegular,
                                fontSize: SIZES.font,
                                color: COLORS.brand.black,
                                lineHeight: 18,
                                marginRight: 5,
                                letterSpacing: 1
                            }}>+91</Text>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter mobile number"
                                placeholderTextColor={COLORS.neutrals.thunder}
                                secureTextEntry={false}
                                keyboardType="number-pad"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                maxLength={10}
                            />
                        </View>
                    </>
                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Sent OTP'
                    onPress={() => navigation.navigate('VerifyMobileNumber', { user_id: user_id, user_mobile_no: mobileNumber })}
                // onPress={verifyMobileNumber}
                />
            </View>
        </SafeAreaView>
    )
}

export default EnterMobileNumber

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
})