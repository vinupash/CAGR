import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { GetCountryList, GetRelationsListApi, GetStateList } from '../../../constants/AllApiCall';
import { Dropdown } from 'react-native-element-dropdown';
import { Input } from '../../../components/CustomInput';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const NomineeDetails = ({ navigation, route }) => {
    const { user_id, profile_update } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [nomineeFirstName, setNomineeFirstName] = useState('')
    const [nomineeMiddleName, setNomineeMiddleName] = useState('')
    const [nomineeLastName, setNomineeLastName] = useState('')
    const [selectedDate, setSelectedDate] = useState();
    const [userBirth, setuserBirth] = useState(false);

    const [isDataRelationsList, setDataRelationsList] = useState([]);
    const [isDataCountryList, setDataCountryList] = useState([]);
    const [isDataStateList, setDataStateList] = useState([]);
    const [isFocusState, setIsFocusState] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [valueRelations, setValueRelations] = useState(null);
    const [applicantRelation, setApplicantRelation] = useState('');
    const [valueState, setValueState] = useState(null);
    const [valueCountry, setValueCountry] = useState(null);
    const [isFocusCountry, setIsFocusCountry] = useState(false);

    const [gaurdianFirstName, setGaurdianFirstName] = useState('')
    const [gaurdianLastName, setGaurdianLastName] = useState('')
    const [gaurdianMiddleName, setGaurdianMiddleName] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')

    console.log(user_id, profile_update);

    const showDatePicker = () => {
        setuserBirth(true);
    };

    const hideDatePicker = () => {
        setuserBirth(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const currentYear = moment().format("YYYY")
    const nomineeBirthYear = moment(selectedDate).format("YYYY");
    const age = currentYear - nomineeBirthYear;

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

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const resultRelations = await GetRelationsListApi();
            const resultCountry = await GetCountryList();
            const resultState = await GetStateList();
            setLoading(false)
            const isDataRelationsList = [...resultRelations.result];
            const newArrayListRelations = isDataRelationsList.map((item) => {
                return { label: item.rel_name, value: item.rel_type }
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
            setDataStateList(newArrayListState)
            setDataRelationsList(newArrayListRelations)
        };
        fetchDataAsync();
    }, []);

    console.log(valueRelations);

    const submitData = async () => {
        setLoading(true)
        try {

            if (!nomineeFirstName || !nomineeMiddleName || !nomineeLastName) {
                handleErrorMsg()
                setErrorMessage('Please enter nominee full name');
                return
            }

            if (!selectedDate) {
                handleErrorMsg()
                setErrorMessage('Please select date of birth');
                return
            }

            if (!valueRelations) {
                handleErrorMsg()
                setErrorMessage('Please select relationship with the applicant');
                return
            } else {
                if (valueRelations === 'Other') {
                    if (!applicantRelation) {
                        handleErrorMsg()
                        setErrorMessage('Please enter relationship with the applicant');
                        return
                    }
                } else {
                    console.log('Selected Relations', valueRelations);
                }
            }

            if (age >= 18) {
                console.log('age', age);
            } else {
                if (!gaurdianFirstName || !gaurdianMiddleName || !gaurdianLastName) {
                    handleErrorMsg()
                    setErrorMessage('Plese enter gaurdian full name');
                    return
                }
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
            myHeaders.append("Cookie", "ses_cagr_f=28962bc7f219a0c34bbaf2493fc82029");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("first_name", nomineeFirstName);
            formdata.append("middle_name", nomineeMiddleName);
            formdata.append("last_name", nomineeLastName);
            formdata.append("nominee_dob", moment(selectedDate).format("YYYY-MM-DD"));
            formdata.append("nominee_relation", selectedRelations === "Other" ? applicantRelation : selectedRelations);
            formdata.append("guardian_first_name", age >= 18 ? "no gaurdian" : gaurdianFirstName);
            formdata.append("guardian_middle_name", age >= 18 ? "no gaurdian" : gaurdianMiddleName);
            formdata.append("guardian_last_name", age >= 18 ? "no gaurdian" : gaurdianLastName);
            formdata.append("country", selectedCountry);
            formdata.append("state", selectedState);
            formdata.append("city", city);
            formdata.append("pincode", pincode);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "register/updatenominee", requestOptions);
            const json = await response.json();
            setLoading(false);
            console.log('json --->', json);
            if (json.status === true) {
                alert(json.message)
                handleSuccessMsg()
                setSuccessMessage(json.message)
                navigation.navigate('Documents', { user_id: user_id, profile_update: profile_update })
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

    console.log(user_id, profile_update);
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
                    <Text style={[styles.snackbarText, { color: COLORS.feedback.success }]}>{isSuccessMessage}</Text>
                </Animated.View>
            )}
            <View style={[styles.topSection]}>
                <BackBtn onPress={navigation.goBack} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <TitleSection
                        titleText='Nominee details'
                        subText='Tell us about your Nominee'
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='First name'
                                placeholder='First'
                                value={nomineeFirstName}
                                setValue={setNomineeFirstName}
                            />
                        </View>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='Middle name'
                                placeholder='Middle'
                                value={nomineeMiddleName}
                                setValue={setNomineeMiddleName}
                            />
                        </View>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='Last name'
                                placeholder='Last'
                                value={nomineeLastName}
                                setValue={setNomineeLastName}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Date of birth</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <TouchableOpacity
                            onPress={showDatePicker}
                            style={styles.inputDateBox}
                        >
                            <Text
                                style={[styles.inputDate, { color: selectedDate ? COLORS.brand.black : COLORS.neutrals.thunder }]} name="userbirth" value={userBirth}
                                placeholder="Select Date"
                                placeholderTextColor={selectedDate ? COLORS.brand.black : COLORS.neutrals.thunder}
                                onChangeText={actualData => setuserBirth(actualData)}
                            >{`${selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "Select Date"}`}</Text>

                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={userBirth}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Relationship with the applicant</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isDataRelationsList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Relationship' : '...'}
                            searchPlaceholder="Search..."
                            value={valueRelations}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValueRelations(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    {
                        valueRelations === 'Other' ?
                            <>
                                <View style={{ marginTop: 10 }}>
                                    <Input
                                        label='Relations'
                                        placeholder='Relationship with the applicant'
                                        value={applicantRelation}
                                        setValue={setApplicantRelation}
                                    />
                                </View>
                            </>
                            :
                            null
                    }

                    {age >= 18 || age == '' ?
                        null
                        :
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.secureTextBox}>
                                <Text style={styles.inputLabel}>Gaurdian Full Name</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '32%' }}>
                                    <Input
                                        label='First name'
                                        placeholder='First'
                                        value={gaurdianFirstName}
                                        setValue={setGaurdianFirstName}
                                    />
                                </View>
                                <View style={{ width: '32%' }}>
                                    <Input
                                        label='Middle name'
                                        placeholder='Middle'
                                        value={gaurdianMiddleName}
                                        setValue={setGaurdianMiddleName}
                                    />
                                </View>
                                <View style={{ width: '32%' }}>
                                    <Input
                                        label='Last name'
                                        placeholder='Last'
                                        value={gaurdianLastName}
                                        setValue={setGaurdianLastName}
                                    />
                                </View>
                            </View>
                        </View>
                    }

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
                            maxHeight={180}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocusState ? 'State' : '...'}
                            searchPlaceholder="Search..."
                            value={valueState}
                            onFocus={() => setIsFocusState(true)}
                            onBlur={() => setIsFocusState(false)}
                            onChange={item => {
                                setValueState(item.value);
                                setIsFocusState(false);
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
                            // onPress={() => navigation.navigate('Documents', { user_id: user_id, profile_update: profile_update })}
                            onPress={submitData}
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default NomineeDetails

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
