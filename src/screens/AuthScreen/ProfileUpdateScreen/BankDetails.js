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
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BankDetails = ({ navigation, route }) => {
    const { user_id, user_mobile_no, profile_update } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [valueBankName, setValueBankName] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isBankList, setBankList] = useState([]);
    const [ifscCode, setIfscCode] = useState('');
    const [valueAccountType, setValueAccountType] = useState(null);
    const [isFocusAccountType, setIsFocusAccountType] = useState(false);
    const [isAccountType, setAccountType] = useState([]);
    const [micrNumber, setMicrNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmBankAccountNumber, setConfirmBankAccountNumber] = useState('');

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const resultBankName = await GetBankList();
            const resultAccountType = await GetAccountType();
            // const resultAddress = await AddressType();
            setLoading(false)
            // console.log(resultAccountType.result);
            const isBankList = [...resultBankName.result];
            const newArrayBankList = isBankList.map((item) => {
                return { value: item.fldi_id, label: item.fldv_bank_name }
            })
            const isAccounType = [...resultAccountType.result];
            const newArrayAccountType = isAccounType.map((item) => {
                return { value: item.fldi_id, label: item.fldv_account_type }
            })
            setBankList(newArrayBankList)
            setAccountType(newArrayAccountType)
        };
        fetchDataAsync();
    }, []);

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

    const submitData = async () => {
        setLoading(true)
        try {

            if (!valueBankName) {
                handleErrorMsg()
                setErrorMessage('Please select bank name');
                return
            }

            if (!valueAccountType) {
                handleErrorMsg()
                setErrorMessage('Please select account type');
                return
            }

            if (ifscCode.trim().length < 9 || !validateIFSCNum(ifscCode)) {
                handleErrorMsg()
                setErrorMessage('Please enter valid IFSC number');
                return
            }

            if (micrNumber.trim().length < 9 || !validateMicrNum(micrNumber)) {
                handleErrorMsg()
                setErrorMessage('Please enter valid MICR number');
                return
            }

            if (!accountNumber) {
                handleErrorMsg()
                setErrorMessage('Enter bank account number');
                return
            }

            if (accountNumber !== confirmBankAccountNumber) {
                handleErrorMsg()
                setErrorMessage('Account no and confirm account does not match');
                return
            }

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
            myHeaders.append("Cookie", "name=2; PHPSESSID=e354242bcc24ac8bef6f723416d70d67");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("bank_id", valueBankName);
            formdata.append("account_type", valueAccountType);
            formdata.append("ifsc_code", ifscCode);
            formdata.append("micr_code", micrNumber);
            formdata.append("account_no", accountNumber);
            formdata.append("confirm_account_no", confirmBankAccountNumber);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "register/updatebankdetails", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json --->', json);

            if (json.status == true) {
                alert(json.message)
                handleSuccessMsg()
                setSuccessMessage(json.message)
                navigation.navigate('KYCDetails', {
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

    console.log(user_id, user_mobile_no, profile_update, valueBankName, valueAccountType);
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
                        titleText='Bank details'
                        subText='Saving bank account in your name from which you will invest and receive payout.'
                    />

                    <View style={{ marginTop: 0 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Bank name</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isBankList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select bank name' : '...'}
                            searchPlaceholder="Search..."
                            value={isBankList}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValueBankName(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Account type</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isAccountType}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusAccountType ? 'Select account type' : '...'}
                            searchPlaceholder="Search..."
                            value={isAccountType}
                            onFocus={() => setIsFocusAccountType(true)}
                            onBlur={() => setIsFocusAccountType(false)}
                            onChange={item => {
                                setValueAccountType(item.value);
                                setIsFocusAccountType(false);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Enter IFSC Code'
                            placeholder='Enter IFSC Code'
                            value={ifscCode}
                            setValue={setIfscCode}
                            autoCapitalize={"characters"}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Enter MICR Number'
                            placeholder='Enter MICR Number'
                            value={micrNumber}
                            setValue={setMicrNumber}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Enter Bank A/C Number'
                            placeholder='Enter Bank A/C Number'
                            value={accountNumber}
                            setValue={setAccountNumber}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Confirm Bank A/C Number'
                            placeholder='Confirm Bank A/C Number'
                            value={confirmBankAccountNumber}
                            setValue={setConfirmBankAccountNumber}
                            keyboardType="number-pad"
                        />
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                        <SecondaryBtn
                            btnText='Submit'
                            onPress={() => navigation.navigate('KYCDetails', { user_id: user_id, user_mobile_no: user_mobile_no, profile_update: true })}
                        // onPress={submitData}
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default BankDetails

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
