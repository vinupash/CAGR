import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import eye from '../../../../assets/images/eye';
import Eyeoff from '../../../../assets/images/Eyeoff';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { Input } from '../../../components/CustomInput';
import TitleSection from '../../../components/TitleSection';
import { COLORS, FONT, SIZES } from '../../../constants';
import { LoginApi } from '../../../constants/AllApiCall';
import { validateEmail } from '../../../constants/methods';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Login = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
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

    const userLogin = async () => {
        if (email.trim().length == 0 || !validateEmail(email)) {
            handleErrorMsg()
            setErrorMessage('Please enter vaild email address');
            return
        }

        if (password.trim().length == 0) {
            handleErrorMsg()
            setErrorMessage('Error: Something went wrong');
            return
        }

        const response = await LoginApi(email, password);
        // console.log('response--->', response);
        if (response.status === 'success') {
            alert(response.message);
            navigation.navigate('MPin', {
                user_id: response.result.fldi_user_id,
                user_name: response.result.fldv_first_name
            });
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
                        titleText='Log in to your account'
                        subText=''
                    />
                    <Input
                        label='Email Address'
                        placeholder='Enter Email address'
                        value={email}
                        setValue={setEmail}
                        autoCapitalize='none'
                    />
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="Enter password"
                                placeholderTextColor={COLORS.neutrals.thunder}
                                secureTextEntry={secureTextEntry}
                                onChangeText={setPassword}
                                value={password}
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

export default Login

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
})