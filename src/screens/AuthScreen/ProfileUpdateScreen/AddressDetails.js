import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { AddressType, GetCountryList, GetStateList } from '../../../constants/AllApiCall';
import RadioButtonBox from '../../../components/RadioButtonBox';
import { Dropdown } from 'react-native-element-dropdown';
import { Input } from '../../../components/CustomInput';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AddressDetails = ({ navigation, route }) => {
    const { user_id, user_mobile_no, profile_update } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [valueAddress, setValueAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [isDataCountryList, setDataCountryList] = useState([]);
    const [isDataAddressList, setDataAddressList] = useState([]);
    const [isDataStateList, setDataStateList] = useState([]);
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [valueState, setValueState] = useState(null);
    const [valueCountry, setValueCountry] = useState(null);
    const [isFocusCountry, setIsFocusCountry] = useState(false);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const resultCountry = await GetCountryList();
            const resultState = await GetStateList();
            const resultAddress = await AddressType();
            setLoading(false)
            console.log(resultAddress.result);
            const isDataAddressList = [...resultAddress.result];
            const newArrayListAddress = isDataAddressList.map((item) => {
                return { label: item.add_type, value: item.add_type_id }
            })
            const isDataCountryList = [...resultCountry.result];
            const newArrayListCountry = isDataCountryList.map((item) => {
                return { label: item.fldv_nicename, value: item.fldi_id }
            })
            const isDataStateList = [...resultState.result];
            const newArrayListState = isDataStateList.map((item) => {
                return { label: item.fldv_name, value: item.fldi_id }
            })
            setDataCountryList(newArrayListCountry)
            setDataAddressList(newArrayListAddress)
            setDataStateList(newArrayListState)
            // console.log('newArrayListState--->', newArrayListState);
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

            if (!address1) {
                handleErrorMsg()
                setErrorMessage('Please enter address line 1');
                return
            }

            if (!address2) {
                handleErrorMsg()
                setErrorMessage('Please enter address line 2');
                return
            }

            if (!address3) {
                handleErrorMsg()
                setErrorMessage('Please enter address line 3');
                return
            }

            if (!valueAddress) {
                handleErrorMsg()
                setErrorMessage('Please select addres type');
                return
            }

            if (!city) {
                handleErrorMsg()
                setErrorMessage('Please enter city');
                return
            }

            if (!pincode || pincode.length < 6) {
                handleErrorMsg()
                setErrorMessage('Please enter pincode');
                return
            }

            if (!valueState) {
                handleErrorMsg()
                setErrorMessage('Please select state');
                return
            }

            if (!valueCountry) {
                handleErrorMsg()
                setErrorMessage('Please select country');
                return
            }

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("address_line_1", address1);
            formdata.append("address_line_2", address2);
            formdata.append("address_line_3", address3);
            formdata.append("address_type", valueAddress);
            formdata.append("city", city);
            formdata.append("state", valueState);
            formdata.append("country", valueCountry);
            formdata.append("pincode", pincode);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(baseUrlDemo + "register/updateaddressdetails", requestOptions);
            const json = await response.json();

            if (json.status == true) {
                alert(json.message)
                handleSuccessMsg()
                setSuccessMessage(json.message)
                navigation.navigate('Bank Details', { user_id: user_id, user_mobile_no: user_mobile_no })
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

    console.log(user_id, user_mobile_no, profile_update, valueState, valueAddress, valueCountry);
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
                        titleText='Address details'
                        subText='We’ll need some of your personal details'
                    />

                    <Input
                        label='Address 1'
                        placeholder='Enter address 1'
                        value={address1}
                        setValue={setAddress1}
                    />

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Address 2'
                            placeholder='Enter address 2'
                            value={address2}
                            setValue={setAddress2}
                        />

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Address 3'
                            placeholder='Enter address 3'
                            value={address3}
                            setValue={setAddress3}
                        />

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Address type</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isDataAddressList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Address type' : '...'}
                            searchPlaceholder="Search..."
                            value={valueAddress}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValueAddress(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='City'
                            placeholder='Enter city'
                            value={city}
                            setValue={setCity}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <Input
                            label='Pin code'
                            placeholder='Enter pin code'
                            keyboardType="number-pad"
                            value={pincode}
                            setValue={setPincode}
                            maxLength={6}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>State</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isDataStateList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'State' : '...'}
                            searchPlaceholder="Search..."
                            value={valueState}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValueState(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Country</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isDataCountryList}
                            search
                            maxHeight={200}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusCountry ? 'Country' : '...'}
                            searchPlaceholder="Search..."
                            value={valueCountry}
                            onFocus={() => setIsFocusCountry(true)}
                            onBlur={() => setIsFocusCountry(false)}
                            onChange={item => {
                                setValueCountry(item.value);
                                setIsFocusCountry(false);
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                        <SecondaryBtn
                            btnText='Submit'
                            onPress={() => navigation.navigate('Bank Details', { user_id: user_id, user_mobile_no: user_mobile_no, profile_update: true })}
                        // onPress={submitData}
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default AddressDetails

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

