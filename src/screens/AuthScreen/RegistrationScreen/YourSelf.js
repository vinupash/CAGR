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
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const YourSelf = ({ navigation, route }) => {
    const { user_id } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [userFirstName, setUserFirstName] = useState('')
    const [userMiddleName, setUserMiddleName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [userBirth, setuserBirth] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

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

            if (!userFirstName) {
                handleErrorMsg()
                setErrorMessage('Plese enter your first name');
                return
            }

            if (!userMiddleName) {
                handleErrorMsg()
                setErrorMessage('Plese enter your middle name');
                return
            }

            if (!userLastName) {
                handleErrorMsg()
                setErrorMessage('Plese enter your last name');
                return
            }

            if (selectedDate === null) {
                handleErrorMsg()
                setErrorMessage('Plese enter your birth date');
                return
            }

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
            myHeaders.append("Cookie", "name=2; PHPSESSID=b5b77004b6028a662e921075dc1fd7b7");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("first_name", userFirstName);
            formdata.append("middle_name", userMiddleName);
            formdata.append("last_name", userLastName);
            formdata.append("dob", moment(selectedDate).format("YYYY-MM-DD"));

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "register/step1", requestOptions);

            const json = await response.json();
            console.log('json --->', json);
            if (json.status === true) {
                handleSuccessMsg()
                alert(json.message);
                setSuccessMessage(json.message);
                navigation.navigate('Gender', { user_id: user_id })
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

    // console.log(user_id);

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
                        titleText='Tell us about yourself'
                        subText='We’ll need some of your personal details'
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='Name (as on PAN)'
                                placeholder='First'
                                value={userFirstName}
                                setValue={setUserFirstName}
                            />
                        </View>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='Name (as on PAN)'
                                placeholder='Middle'
                                value={userMiddleName}
                                setValue={setUserMiddleName}
                            />
                        </View>
                        <View style={{ width: '32%' }}>
                            <Input
                                label='Name (as on PAN)'
                                placeholder='Last'
                                value={userLastName}
                                setValue={setUserLastName}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
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
                            >
                                {`${selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "Select Date"}`}
                            </Text>

                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={userBirth}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                    </View>

                </ScrollView>
            </View>
            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Next'
                    // onPress={() => navigation.navigate('Gender', { user_id: user_id })}
                    onPress={submitData}
                />
            </View>
        </SafeAreaView>
    )
}

export default YourSelf

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
})