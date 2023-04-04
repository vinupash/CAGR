import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { AddressType, GetAccountType, GetBankList, GetCountryList, GetStateList } from '../../../constants/AllApiCall';
import RadioButtonBox from '../../../components/RadioButtonBox';
import { Dropdown } from 'react-native-element-dropdown';
import { Input } from '../../../components/CustomInput';
import { validateIFSCNum, validateMicrNum } from '../../../constants/methods';
import MaritalRadioButton from '../../../components/MaritalRadioButton';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const KYCDetails = ({ navigation, route }) => {
    const { user_id, user_mobile_no, profile_update } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [fatherhusbandName, setFatherhusbandName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [option, setOption] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
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

    const maritalData = [
        {
            key: '1',
            title: 'Single',
            value: 'Single',
        },
        {
            key: '2',
            title: 'Married',
            value: 'Married',
        },
        {
            key: '3',
            title: 'NA',
            value: 'NA',
        },
    ];

    const submitData = async () => {
        setLoading(true)
        try {

            if (!fatherhusbandName) {
                handleErrorMsg()
                setErrorMessage('Please enter father / husband name');
                return
            }

            if (!motherName) {
                handleErrorMsg()
                setErrorMessage('Please enter mother name');
                return
            }

            if (!option) {
                handleErrorMsg()
                setErrorMessage('Please select bank name');
                return
            }

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
            myHeaders.append("Cookie", "name=2; PHPSESSID=4f6b5f7544effe38c88f3aca6dc4e58d");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("father_spouse_name", fatherhusbandName);
            formdata.append("marital_status", option);
            formdata.append("mother_name", motherName);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "register/updatekycdetails", requestOptions);
            const json = await response.json();

            if (json.status == true) {
                alert(json.message)
                handleSuccessMsg()
                setSuccessMessage(json.message)
                navigation.navigate('NomineeDetails', {
                    user_id: user_id,
                    user_mobile_no: user_mobile_no,
                    profile_update: true
                })
            } else {
                handleErrorMsg()
                setErrorMessage(json.message)
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    console.log(user_id, user_mobile_no, profile_update);
    // console.log(data);

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
                    <Text style={[styles.snackbarText, { color: COLORS.feedback.success }]}>{errorMessage}</Text>
                </Animated.View>
            )}
            <View style={[styles.topSection]}>
                <BackBtn onPress={navigation.goBack} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <TitleSection
                        titleText='KYC'
                        subText='KYC / FATCA & CRS details'
                    />

                    <Input
                        label='Father / Husband name'
                        placeholder='Enter father / husband name'
                        value={fatherhusbandName}
                        setValue={setFatherhusbandName}
                    />

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Mother name'
                            placeholder='Enter mother name'
                            value={motherName}
                            setValue={setMotherName}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Marital status</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <MaritalRadioButton
                            data={maritalData}
                            onSelect={(value) => setOption(value)}
                        />
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                        <SecondaryBtn
                            btnText='Submit'
                            // onPress={() => navigation.navigate('KYCDetails', { user_id: user_id, user_mobile_no: user_mobile_no, profile_update: true })}
                            onPress={submitData}
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default KYCDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    topSection: {
        flex: 1,
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
    inputDateBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },


    dropdown: {
        height: 45,
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.neutrals.thunder,
    },
    selectedTextStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})
