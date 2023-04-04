import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import eye from '../../../../assets/images/eye';
import Eyeoff from '../../../../assets/images/Eyeoff';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { SvgXml } from 'react-native-svg';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { SetAppPasswordApi } from '../../../constants/AllApiCall';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const PasswordScreen = ({ navigation, route }) => {
    const { user_id } = route.params;
    const [isLoading, setLoading] = useState(false);
    // const [user_id, setUser_id] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [isPassword, setPassword] = useState('');
    const [isReenterPassword, setReenterPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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


    const setAppPassword = async () => {
        setLoading(true)
        const response = await SetAppPasswordApi(user_id, isPassword, isReenterPassword);
        setLoading(false)
        console.log('response--->', response);
        if (response.status === true) {
            alert(response.message)
            handleSuccessMsg()
            setSuccessMessage(response.message)
            navigation.navigate('EnterMobileNumber', { user_id: user_id })
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
                        titleText='Set up your password'
                        subText=''
                    />
                    <View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Set Password</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <View style={styles.textInputBox}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Set password"
                                placeholderTextColor={COLORS.neutrals.thunder}
                                secureTextEntry={secureTextEntry}
                                value={isPassword}
                                onChangeText={setPassword}
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

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Confirm Password</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <View style={styles.textInputBox}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Confirm password"
                                placeholderTextColor={COLORS.neutrals.thunder}
                                secureTextEntry={secureTextEntryConfirm}
                                value={isReenterPassword}
                                onChangeText={setReenterPassword}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setSecureTextEntryConfirm(!secureTextEntryConfirm);
                                    return false;
                                }}
                            >
                                {!secureTextEntryConfirm ? <SvgXml xml={Eyeoff} width={28} height={22} /> : <SvgXml xml={eye} width={28} height={22} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Confirm'
                    onPress={() => navigation.navigate('EnterMobileNumber', { user_id: user_id })}
                // onPress={setAppPassword}
                />
            </View>
        </SafeAreaView>
    )
}

export default PasswordScreen

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
})