import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    Dimensions,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Keyboard,
    ActivityIndicator,
    Animated
} from 'react-native';

import { SvgXml } from 'react-native-svg';
// import RadioActive from '../../../assets/images/RadioActive';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
// import Calendar from '../../../assets/images/Calendar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseUrlDemo } from '../../constants/api';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { FONT, SIZES, assets, SHADOWS, COLORS } from '../../../constants';
import CustomSwitchSip from '../../../components/CustomSwitchSip';
import { Input, InputAmount } from '../../../components/CustomInput';
import { BackBtnBlue, PrimaryBtn } from '../../../components/CustomButton';
import { GetAllNomineeList, GetBankDetails, GetFolioNumberList, GetInvestFundDetails, GetUserDataApi, TransactionOtpApi } from '../../../constants/AllApiCall';
import { Dropdown } from 'react-native-element-dropdown';

const width = Dimensions.get('window').width

const InvestFund = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const [isLoadingTransition, setLoadingTransition] = useState(false);
    const { id_fund } = route.params;
    // const { id_fund, minInvestAmount, SIPAmount, fundOption, fundName, sipDate } = route.params;
    const [selectedDate, setSelectedDate] = useState();
    const [sipStartDate, setSipStartDate] = useState(false);
    const [enterAmount, setenterAmount] = useState('');
    const [enterSipAmount, setenterSipAmount] = useState('');
    const [selectedState, setSelectedState] = useState(null);
    const [selectedFolioOneTimeNumber, setSelectedFolioOneTimeNumber] = useState(null);
    const [selectedFolioStartSip, setSelectedFolioStartSip] = useState(null);
    const [selectedNomination, setSelectedNomination] = useState(null);
    const [selectedNominationStartSip, setSelectedNominationStartSip] = useState(null);
    // const nomination = ["Opt out", "Opt in"]
    const nomination = [
        {
            "value": "0",
            "label": "Opt out"
        },
        {
            "value": "1",
            "label": "Opt in"
        },
    ]
    const nominationStartSip = ["Opt out", "Opt in"]
    const selectFolioOneTime = ['123456', '678912', '6987456', '103333']
    const selectFolioStartSip = ['000000', '678912', '6987456', '103333']
    const selectYears = [1, 3, 5, 10]
    const [selectedFolioOneTimeNumberError, setSelectedFolioOneTimeNumberError] = useState(null)
    const [minimumOneTimeAmountError, setMinimumOneTimeAmountError] = useState(null)
    const [selectedNominationOneTimeError, setSelectedNominationOneTimeError] = useState(null)
    const [oneTimeFundDetails, setOneTimeFundDetails] = useState(false);
    const [startSipDetails, setStartSipDetails] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [selectedStartSipYears, setSelectedStartSipYears] = useState(null)
    const [selectedFolioStartSipError, setSelectedFolioStartSipError] = useState(null)
    const [sipAmountError, setSipAmountError] = useState(null)
    const [selectedSipStartDateError, setSelectedSipStartDateError] = useState(null)
    const [selectedSipYears, setSelectedSipYears] = useState(null)
    const [user_id, setUser_id] = useState('')
    const [isGetAllNomineeList, setGetAllNomineeList] = useState(null)
    const [selectedSIPDate, setSelectedSIPDate] = useState(null)

    const [isInvestFundSchname, setInvestFundSchname] = useState('')
    const [isMinInvestAmount, setMinInvestAmount] = useState('')
    const [isMinSIPAmount, setMinSIPAmount] = useState('')
    const [isFundGroth, setFundGroth] = useState('')
    const [isFundClass, setFundClass] = useState('')
    const [isCurrentNAV, setCurrentNAV] = useState('')
    const [isFundOption, setFundOption] = useState('')
    const [isSipeDate, setSipeDate] = useState([])
    const [isAmcCode, setAmcCode] = useState('')
    const [isFolioList, setFolioList] = useState([])
    const [isSelectedNominationId, setSelectedNominationId] = useState('')
    const [isUerHoldingDetails, setUerHoldingDetails] = useState('')
    const [isBankList, setBankList] = useState(null)
    const [isSelectBankId, setSelectBankId] = useState(null)
    const [isSelectBankName, setSelectBankName] = useState(null)
    const [isSelectBankNameError, setSelectBankNameError] = useState(null)
    const [isOtpCode, setOtpCode] = useState('')
    const [isOtpCodeJointHolder, setOtpCodeJointHolder] = useState('')
    const [isOtpCodeError, setOtpCodeError] = useState(null)
    const [isSipOtpCode, setSipOtpCode] = useState('')
    const [isSipOtpCodeJointHolder, setSipOtpCodeJointHolder] = useState('')
    const [isSipOtpCodeError, setSipOtpCodeError] = useState(null)
    const [isSelectedSipOptions, setSelectedSipOptions] = useState(null)
    const [isSelectedSipOptionsError, setSelectedSipOptionsError] = useState(null)
    const [isSipMonth, setSipMonth] = useState('')
    const [isSipYears, setSipYers] = useState('')
    const [isSipOptinError, setSipOptinError] = useState(null)

    const [isSipInstallment, setSipInstallment] = useState('')
    const [isSipInstallmentError, setSipInstallmentError] = useState(null)

    const [valueFolioList, setValueFolioList] = useState(null);
    const [isFocusFolioList, setIsFocusFolioList] = useState(false);
    const [isDataFolioListList, setDataFolioListList] = useState([]);

    const [valueBankList, setValueBankList] = useState(null);
    const [isFocusBankList, setIsFocusBankList] = useState(false);
    const [isDataBankList, setDataBankList] = useState([]);

    const [valueNomination, setValueNomination] = useState(null);
    const [isFocusNomination, setIsFocusNomination] = useState(false);

    const [valueNominationList, setValueNominationList] = useState(null);
    const [isFocusNominationList, setIsFocusNominationList] = useState(false);
    const [isDataNominationList, setDataNominationList] = useState([]);

    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const selectSipOptn = [
        {
            "value": "1",
            "label": "Until cancelled"
        },
        {
            "value": "2",
            "label": "Month and Year's"
        },
        {
            "value": "3",
            "label": "Total no of installments"
        },
    ]

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const userDataAfterMPin = await AsyncStorage.getItem("userDataAfterMPin");
            const transformedUserLoginData = JSON.parse(userDataAfterMPin);
            // console.log(transformedUserLoginData);
            setUser_id(transformedUserLoginData.user_id)
            const userid = transformedUserLoginData.user_id;
            const idFund = id_fund;
            const responseUserData = await GetUserDataApi(userid);
            const responseGetAllNomineeList = await GetAllNomineeList(userid);
            const resultInvestFund = await GetInvestFundDetails(idFund);
            const AmcCode = resultInvestFund.result.amccode;
            const resultFolioNumberList = await GetFolioNumberList(userid, AmcCode);
            const resultUserBankDetails = await GetBankDetails(userid);
            setLoading(false)
            setInvestFundSchname(resultInvestFund.result.schname)
            setMinInvestAmount(resultInvestFund.result.minamount)
            setMinSIPAmount(resultInvestFund.result.sip_minamount)
            setFundGroth(resultInvestFund.result.fundgrowth)
            setFundClass(resultInvestFund.result.fundclas)
            setCurrentNAV(resultInvestFund.result.nav)
            setFundOption(resultInvestFund.result.fundoption)
            setSipeDate(resultInvestFund.result.sip_date)
            setAmcCode(resultInvestFund.result.amccode)
            const FolioListNew = [...resultFolioNumberList.result];
            const newFolioList = FolioListNew.map((item) => {
                return { label: item.fldv_folio_no, value: item.fldv_folio_no }
            })
            // console.log('newFolioList--->', newFolioList);
            setFolioList(newFolioList)
            setDataFolioListList(newFolioList)
            setUerHoldingDetails(responseUserData.result.flg_holding)

            const BankDetailsNew = [...resultUserBankDetails.result];
            const newBankDetailList = BankDetailsNew.map((item) => {
                return { value: item.fldi_bank_id, label: item.fldv_bank_name }
            })
            console.log('newBankDetailList--->', newBankDetailList);
            setDataBankList(newBankDetailList)

            const NomineeListNew = [...responseGetAllNomineeList.result];
            const newArrayNomineeLList = NomineeListNew.map((item) => {
                return { label: item.fldv_first_name, value: item.fldv_relation }
            })
            console.log('newArrayNomineeLList--->', newArrayNomineeLList);
            setDataNominationList(newArrayNomineeLList)
            // console.log('responseGetAllNomineeList--->', responseGetAllNomineeList.result);
            // console.log('resultInvestFund--->', resultInvestFund.result.arrFunds);

            // const isDataAMCMasterList = [...resultAMCMaster.result];
            // const newArrayListAMCMAster = isDataAMCMasterList.map((item) => {
            //     return { label: item.amcname, value: item.amccode }
            // })
            // setDataAMCMasterList(newArrayListAMCMAster)

            // const isDataSchemeMasterList = [...resultSchemeMaster.result];
            // const newArrayListSchemeMaster = isDataSchemeMasterList.map((item) => {
            //     return { label: item.value, value: item.key }
            // })
            // setDataSchemeMasterList(newArrayListSchemeMaster)

            // const isDataFundDivOptionsList = [...resultFundDivOptionsApi.result];
            // const newArrayListFundDivOption = isDataFundDivOptionsList.map((item) => {
            //     return { label: item.value, value: item.key }
            // })
            // setDataFundDivOptionsList(newArrayListFundDivOption)
            // setGetAllInvestFundList(resultInvestFund.result.arrFunds)
            // setGetAllInvestFund(resultInvestFund.result.arrFunds)
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


    const NomineeInfo = () => {
        return isDataNominationList.map((NomineeInfoData, i) => {
            return (
                <View style={styles.secureTextBox} key={i}>
                    <Text style={styles.inputLabelRight}>{NomineeInfoData.label} ({NomineeInfoData.value})</Text>
                </View>
            );
        });
    };

    const showDatePicker = () => {
        setSipStartDate(true);
    };

    const hideDatePicker = () => {
        setSipStartDate(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const [sipTab, setSipTab] = useState(1);

    const onSelectSwitch = value => {
        setSipTab(value);
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    // console.log('isKeyboardVisible', valueNomination);

    const oneTimeSip = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.inputSection}
                keyboardDismissMode={'on-drag'}
            >

                {
                    isDataFolioListList.length === 0 ?
                        null
                        :
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.secureTextBox}>
                                <Text style={styles.inputLabel}>Select Folio</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={isDataFolioListList}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={!isFocusFolioList ? 'Select Folio No.' : '...'}
                                searchPlaceholder="Search..."
                                value={valueFolioList}
                                onFocus={() => setIsFocusFolioList(true)}
                                onBlur={() => setIsFocusFolioList(false)}
                                onChange={item => {
                                    setValueFolioList(item.value);
                                    setIsFocusFolioList(false);
                                }}
                            />
                        </View>
                }

                <View style={{ marginTop: 20 }}>
                    <Input
                        label='Amount you want to invest'
                        placeholder='Enter amount'
                        value={enterAmount}
                        setValue={setenterAmount}
                        keyboardType="number-pad"
                    />

                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Minimum investment amount is ₹{Intl.NumberFormat('en-IN').format(isMinInvestAmount)}</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Select Bank</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={isDataBankList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusBankList ? 'Select Bank' : '...'}
                        searchPlaceholder="Search..."
                        value={valueBankList}
                        onFocus={() => setIsFocusBankList(true)}
                        onBlur={() => setIsFocusBankList(false)}
                        onChange={item => {
                            setValueBankList(item.value);
                            setIsFocusBankList(false);
                        }}
                    />
                </View>

                {isUerHoldingDetails == "S" ?
                    <>
                        <View style={{ marginTop: 20 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code1 => {
                                        console.log(`Code is ${code1}, you are good to go!`)
                                        setOtpCode(code1)
                                    })}
                                />
                            </View>

                        </View>

                        <View style={{ marginTop: 10 }}>

                            <TouchableOpacity
                                style={[styles.secondaryBtn]}
                                onPress={TransactionOtp}
                            >
                                <Text style={styles.secondaryBtnText}>Send OTP</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.neutrals.thunder
                                }}>Didn’t receive OTP?</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
                                    onPress={TransactionOtp}
                                >
                                    <Text style={{
                                        fontFamily: FONT.PlusJakartaSansBold,
                                        fontSize: SIZES.font,
                                        color: COLORS.brand.secondary,
                                        fontWeight: '600'
                                    }}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
                    :
                    <>
                        <View style={{ marginTop: 20 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code1 => {
                                        console.log(`Code is ${code1}, you are good to go!`)
                                        setOtpCode(code1)
                                    })}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP (Joint holder)</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code2 => {
                                        console.log(`Code is ${code2}, you are good to go!`)
                                        setOtpCodeJointHolder(code2)
                                    })}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.secondaryBtn, { marginTop: 10 }]}
                            // onPress={TransactionOtp}
                            >
                                <Text style={styles.secondaryBtnText}>Send OTP</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.neutrals.thunder
                                }}>Didn’t receive OTP?</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
                                // onPress={resendMobileOtp}
                                >
                                    <Text style={{
                                        fontFamily: FONT.PlusJakartaSansBold,
                                        fontSize: SIZES.font,
                                        color: COLORS.brand.secondary,
                                        fontWeight: '600'
                                    }}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }

                <View style={{ marginTop: 20 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Nomination</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={nomination}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusNomination ? 'Select Nomination' : '...'}
                        searchPlaceholder="Search..."
                        value={valueNomination}
                        onFocus={() => setIsFocusNomination(true)}
                        onBlur={() => setIsFocusNomination(false)}
                        onChange={item => {
                            setValueNomination(item.value);
                            setIsFocusNomination(false);
                        }}
                    />
                    {valueNomination == 1 ?
                        (<View style={{
                            marginBottom: 5,
                            marginHorizontal: 5,
                        }}>
                            <Text style={styles.inputLabel}>Nominee</Text>
                            {/* <Text style={styles.inputLabelRight}>Jocelyn Marsh (Wife)</Text> */}
                            {NomineeInfo()}
                        </View>) : null}

                </View>

                {/* <TouchableOpacity style={{ marginTop: 20, marginBottom: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                    <SvgXml xml={RadioActive} width={14} height={14} style={{ marginTop: 5 }} /><Text style={styles.nomineeText}>Execution only</Text>
                </TouchableOpacity> */}

            </ScrollView >
        )
    }

    const startSip = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.inputSection}
                keyboardDismissMode={'on-drag'}
            >

                {
                    isFolioList.length === 0 ?
                        null
                        :
                        <View style={{ marginTop: 10 }}>
                            <View style={styles.secureTextBox}>
                                <Text style={styles.inputLabel}>Select Folio</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            {/* <SelectDropdown
                                data={isFolioList}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setSelectedFolioOneTimeNumber(selectedItem)
                                }}
                                defaultButtonText="Select Folio"
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font, color: selectedFolioOneTimeNumber ? COLORS.brand.black : COLORS.neutrals.thunder, textAlign: 'left'
                                }}
                                renderDropdownIcon={isOpened => {
                                    return <AntDesign name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.neutrals.thunder} size={20} />;
                                }}
                                rowStyle={{
                                    height: 40,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.neutrals.thunder
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.neutrals.coconut, borderRadius: 10 }}
                            />
                            {selectedFolioOneTimeNumberError ? <Text style={styles.invalidTextMsg}>{selectedFolioOneTimeNumberError}</Text> : null} */}
                        </View>
                }

                <View style={{ marginTop: 20 }}>

                    <InputAmount
                        label='Amount you want to invest'
                        placeholder='Enter amount'
                        value={enterSipAmount}
                        setValue={setenterSipAmount}
                        keyboardType="number-pad"
                    />
                    {sipAmountError ? <Text style={styles.invalidTextMsg}>{sipAmountError}</Text> : null}
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Minimum investment amount is ₹{Intl.NumberFormat('en-IN').format(isMinSIPAmount)}</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Select monthly installment date</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    {/* <SelectDropdown
                        data={isSipeDate.split(",")}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setSelectedSIPDate(selectedItem)
                        }}
                        defaultButtonText="Select monthly installment date"
                        buttonStyle={styles.dropdownContainer}
                        buttonTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font, color: selectedFolioOneTimeNumber ? COLORS.brand.black : COLORS.neutrals.thunder, textAlign: 'left'
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.neutrals.thunder} size={20} />;
                        }}
                        rowStyle={{
                            height: 40,
                        }}
                        rowTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font,
                            color: COLORS.neutrals.thunder
                        }}
                        dropdownStyle={{ backgroundColor: COLORS.neutrals.coconut, borderRadius: 10 }}
                    />

                    {selectedSipStartDateError ? <Text style={styles.invalidTextMsg}>{selectedSipStartDateError}</Text> : null} */}
                </View>
                <View style={{ marginTop: 20 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Select options</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    {/* <SelectDropdown
                        data={selectSipOptn}
                        onSelect={(selectedItem, index) => {
                            console.log('option--->', selectedItem.option, selectedItem.id, index)
                            // setSelectedNomination(selectedItem.option)
                            setSelectedSipOptions(selectedItem.id)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.option
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.option
                        }}
                        defaultButtonText="Select options"
                        buttonStyle={styles.dropdownContainer}
                        buttonTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font, color: selectedStartSipYears ? COLORS.brand.black : COLORS.neutrals.thunder, textAlign: 'left'
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.neutrals.thunder} size={20} />;
                        }}
                        rowStyle={{
                            height: 40,
                        }}
                        rowTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font,
                            color: COLORS.neutrals.thunder
                        }}
                        dropdownStyle={{ backgroundColor: COLORS.neutrals.coconut, borderRadius: 10 }}
                    />
                    {selectedSipYears ? <Text style={styles.invalidTextMsg}>{selectedSipYears}</Text> : null} */}
                </View>

                {
                    isSelectedSipOptions == '2' ?
                        (
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ width: '48%' }}>
                                        <Input
                                            label="Enter month's"
                                            value={isSipMonth}
                                            setValue={setSipMonth}
                                            keyboardType="number-pad"
                                            maxLength={2}
                                        />
                                    </View>
                                    <View style={{ width: '48%' }}>
                                        <Input
                                            label="Enter year's"
                                            value={isSipYears}
                                            setValue={setSipYers}
                                            keyboardType="number-pad"
                                            maxLength={4}
                                        />
                                    </View>
                                </View>
                            </View>
                        )
                        :
                        null
                }

                {
                    isSelectedSipOptions === '3' ?
                        (
                            (
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: '48%' }}>
                                            <Input
                                                label="Enter month's"
                                                value={isSipInstallment}
                                                setValue={setSipInstallment}
                                                keyboardType="number-pad"
                                                maxLength={4}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        )
                        :
                        null
                }
                <View style={{ marginTop: 20 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Select Bank</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    {/* <SelectDropdown
                        data={isBankList}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem.id, index)
                            setSelectBankId(selectedItem.id)
                            setSelectBankName(selectedItem.name)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name
                        }}
                        defaultButtonText="Select Bank"
                        buttonStyle={styles.dropdownContainer}
                        buttonTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font, color: selectedFolioOneTimeNumber ? COLORS.brand.black : COLORS.neutrals.thunder, textAlign: 'left'
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.neutrals.thunder} size={20} />;
                        }}
                        rowStyle={{
                            height: 40,
                        }}
                        rowTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font,
                            color: COLORS.neutrals.thunder
                        }}
                        dropdownStyle={{ backgroundColor: COLORS.neutrals.coconut, borderRadius: 10 }}
                    />
                    {isSelectBankNameError ? <Text style={styles.invalidTextMsg}>{isSelectBankNameError}</Text> : null} */}
                </View>

                {isUerHoldingDetails == "S" ?
                    <>
                        <View style={{ marginTop: 20 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code1 => {
                                        console.log(`Code is ${code1}, you are good to go!`)
                                        setOtpCode(code1)
                                    })}
                                />
                            </View>

                            {isOtpCodeError ? <Text style={styles.invalidTextMsg}>{isOtpCodeError}</Text> : null}
                        </View>

                        <View style={{ marginTop: 10 }}>

                            <TouchableOpacity
                                style={[styles.secondaryBtn]}
                            // onPress={TransactionOtp}
                            >
                                <Text style={styles.secondaryBtnText}>Send OTP</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.neutrals.thunder
                                }}>Didn’t receive OTP?</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
                                // onPress={resendMobileOtp}
                                >
                                    <Text style={{
                                        fontFamily: FONT.PlusJakartaSansBold,
                                        fontSize: SIZES.font,
                                        color: COLORS.brand.secondary,
                                        fontWeight: '600'
                                    }}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
                    :
                    <>
                        <View style={{ marginTop: 20 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code1 => {
                                        console.log(`Code is ${code1}, you are good to go!`)
                                        setSipOtpCode(code1)
                                    })}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={[styles.secureTextBox, { marginLeft: 0 }]}>
                                <Text style={styles.inputLabel}>Transaction OTP (Joint holder)</Text>
                                <Text style={styles.inputLabelRight}></Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <OTPInputView
                                    style={{ width: '70%', height: 70 }}
                                    pinCount={5}
                                    borderStyleBase
                                    autoFocusOnLoad={false}
                                    codeInputFieldStyle={styles.underlineStyleBase}
                                    codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                    onCodeFilled={(code2 => {
                                        console.log(`Code is ${code2}, you are good to go!`)
                                        setSipOtpCodeJointHolder(code2)
                                    })}
                                />
                            </View>

                            {isSipOtpCodeError ? <Text style={styles.invalidTextMsg}>{isSipOtpCodeError}</Text> : null}

                            <TouchableOpacity
                                style={[styles.secondaryBtn, { marginTop: 10 }]}
                            // onPress={TransactionOtp}
                            >
                                <Text style={styles.secondaryBtnText}>Send OTP</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{
                                    fontFamily: FONT.PlusJakartaSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.neutrals.thunder
                                }}>Didn’t receive OTP?</Text>
                                <TouchableOpacity
                                    style={{ marginLeft: 5 }}
                                // onPress={resendMobileOtp}
                                >
                                    <Text style={{
                                        fontFamily: FONT.PlusJakartaSansBold,
                                        fontSize: SIZES.font,
                                        color: COLORS.brand.secondary,
                                        fontWeight: '600'
                                    }}>Resend</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                }

                <View style={{ marginTop: 20 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Nomination</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    {/* <SelectDropdown
                        data={nominationStartSip}
                        onSelect={(selectedItem, index) => {
                            // console.log(selectedItem, index)
                            setSelectedNominationStartSip(selectedItem)
                        }}
                        defaultButtonText="Nomination"
                        buttonStyle={styles.dropdownContainer}
                        buttonTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font, color: selectedNominationStartSip ? COLORS.brand.black : COLORS.neutrals.thunder, textAlign: 'left'
                        }}
                        renderDropdownIcon={isOpened => {
                            return <AntDesign name={isOpened ? 'chevron-up' : 'chevron-down'} color={COLORS.neutrals.thunder} size={20} />;
                        }}
                        rowStyle={{
                            height: 40,
                        }}
                        rowTextStyle={{
                            fontFamily: FONT.PlusJakartaSansRegular,
                            fontSize: SIZES.font,
                            color: COLORS.neutrals.thunder
                        }}
                        dropdownStyle={{ backgroundColor: COLORS.neutrals.coconut, borderRadius: 10 }}
                    /> */}
                    {/* {selectedNominationStartSip === 'Opt in' ?
                        (<View style={{
                            marginBottom: 5,
                            marginHorizontal: 5,
                        }}>
                            <Text style={styles.inputLabel}>Nominee</Text>
                            {NomineeInfo()}
                        </View>) : null}
                    {selectedNominationOneTimeError ? <Text style={styles.invalidTextMsg}>{selectedNominationOneTimeError}</Text> : null} */}
                </View>

                {/* <TouchableOpacity style={{ marginTop: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'flex-start' }}>
                    <SvgXml xml={RadioActive} width={14} height={14} style={{ marginTop: 5 }} /><Text style={styles.nomineeText}>Execution only</Text>
                </TouchableOpacity> */}
            </ScrollView>
        )
    }

    const oneTimeSubmit = async () => {

    }

    // const startSipSubmit = async () => {
    //     try {
    //         setLoadingTransition(true)
    //         var myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

    //         var formdata = new FormData();
    //         formdata.append("user_id", user_id);
    //         formdata.append("fid", id_fund);
    //         formdata.append("fo", isFundOption);
    //         formdata.append("fno", "");
    //         formdata.append("amt", enterSipAmount);
    //         formdata.append("sipdate", "");
    //         formdata.append("sipdate", selectedSIPDate);
    //         formdata.append("euinid", "");
    //         formdata.append("siptill", isSelectedSipOptions == '1' ? isSelectedSipOptions : null);
    //         formdata.append("month", isSipMonth);
    //         formdata.append("year", isSipYears);
    //         formdata.append("totinstallments", isSipInstallment);
    //         formdata.append("authcode", isSipOtpCode);
    //         formdata.append("authcode1", isSipOtpCodeJointHolder);
    //         formdata.append("nomination", isSelectedNominationId);

    //         var requestOptions = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: formdata,
    //             redirect: 'follow'
    //         };

    //         const response = await fetch(baseUrlDemo + "sip/sippreview", requestOptions);
    //         const json = await response.json();
    //         setLoadingTransition(false)
    //         console.log('sip/sippreview--->', json.result);
    //         if (json.status === true) {
    //             navigation.navigate('Invest Stack', {
    //                 screen: 'Invest Sip Fund Details View',
    //                 params: {
    //                     user_id: user_id,
    //                     id_fund: id_fund,
    //                     min_invest_amount: enterSipAmount,
    //                     folio_number: selectedFolioOneTimeNumber,
    //                     minInvestAmount: isMinSIPAmount,
    //                     // SIPAmount: isMinSIPAmount,
    //                     fundOption: isFundOption,
    //                     fundName: isInvestFundSchname,
    //                     // sipDate: isSipeDate,
    //                     nominationId: isSelectedNominationId,
    //                     bank_name: isSelectBankName,
    //                     bank_id: isSelectBankId,
    //                     sipdate: json.result.sipdate,
    //                     siptill: json.result.siptill,
    //                 }
    //             })
    //         } else {
    //             alert(json.message);
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    const TransactionOtp = async () => {
        const response = await TransactionOtpApi(user_id);
        console.log(response);
        if (response.status == true) {
            handleSuccessMsg()
            setSuccessMessage(response.message)
        } else {
            handleErrorMsg()
            setErrorMessage(response.message)
        }
    };

    // const resendMobileOtp = async () => {
    //     try {
    //         setLoadingTransition(true)
    //         var myHeaders = new Headers();
    //         myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
    //         myHeaders.append("Cookie", "name=2; ses_cagr_f=9a2f2b8a0e24e04b13abe3b4f5db43c6");

    //         var formdata = new FormData();
    //         formdata.append("user_id", user_id);

    //         var requestOptions = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: formdata,
    //             redirect: 'follow'
    //         };

    //         const response = await fetch(baseUrlDemo + "invest/validate_otp_details", requestOptions);
    //         const json = await response.json();
    //         setLoadingTransition(false);
    //         console.log('json-->', json.result);
    //         if (json.status == true) {
    //             alert(json.message)
    //         } else {
    //             alert(json.message)
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }


    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    // invest/validate_otp_details
    // invest/buypreview
    // holding == s ? 1 : 2
    // banking api
    // optin = 1
    // optout = 0
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
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={styles.topSection}>
                    <View style={{ height: 140, backgroundColor: COLORS.brand.primary, width: width, paddingHorizontal: 10 }}>
                        <BackBtnBlue
                            onPress={() => navigation.goBack()}
                        />
                    </View>

                    <View style={[styles.fundDetailsSection, { top: isKeyboardVisible ? '14%' : '10%' }]}>

                        <View style={{
                            backgroundColor: COLORS.neutrals.coconut,
                            padding: selectedNomination === 'Opt in' ? 10 : 20,
                            borderRadius: 10,
                            ...SHADOWS.light
                        }}>
                            <View style={styles.pageTitleTextBox}>
                                <Image source={assets.Axis} style={{ width: 40, height: 40 }} />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={styles.pageTitleText}>{isInvestFundSchname}</Text>
                                </View>
                            </View>
                            <View style={{ paddingVertical: 10 }}>
                                <CustomSwitchSip
                                    selectionMode={1}
                                    option1="One time"
                                    option2="Start SIP"
                                    onSelectSwitch={onSelectSwitch}
                                />
                            </View>

                            {sipTab == 1 && oneTimeSip()}
                            {sipTab == 2 && startSip()}

                        </View>

                    </View>

                </View>

                {!isKeyboardVisible ?
                    <View style={styles.bottomSection}>
                        {!oneTimeFundDetails && !startSipDetails ?
                            <>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', paddingBottom: 14 }}>
                                    <Text style={styles.bottomText}>By continuing, I agree to the</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.bottomText, { paddingHorizontal: 3, color: COLORS.brand.secondary }]}>Declarations</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.bottomText}>and</Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.bottomText, { paddingHorizontal: 3, color: COLORS.brand.secondary }]}>T&Cs.</Text>
                                    </TouchableOpacity>
                                </View>
                                {sipTab == 1 ?
                                    <PrimaryBtn
                                        btnText='Proceed'
                                        onPress={oneTimeSubmit}
                                    /> :
                                    <PrimaryBtn
                                        btnText='Proceed'
                                    // onPress={startSipSubmit}
                                    />
                                }
                            </> : null

                        }

                    </View>
                    :
                    null
                }

            </View>
        </SafeAreaView>
    )
}

export default InvestFund

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.brand.background
    },
    bottomSection: {
        flex: 2,
        justifyContent: 'center',
        // paddingHorizontal: 20,
        alignSelf: 'center',
        paddingBottom: 10
    },
    topSection: {
        flex: 6,
        position: 'relative'
    },
    bottomText: {
        fontFamily: FONT.PlusJakartaSansRegular,
        color: COLORS.neutrals.thunder,
        fontSize: SIZES.base
    },
    fundDetailsSection: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        width: width - 20,
        bottom: '20%',
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
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.neutrals.charcoal,
    },
    dropdownContainer: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 6,
        // textAlign: 'left'
    },
    nomineeText: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
        marginLeft: 8
    },
    inputDate: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        // letterSpacing: 1,
        color: COLORS.neutrals.thunder
    },
    inputDateBox: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        // justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    invalidTextMsg: {
        marginHorizontal: 10,
        marginTop: 5,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: 11,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.feedback.error,
    },
    pageTitleTextBox: {
        flexDirection: 'row'
    },
    pageTitleText: {
        fontFamily: FONT.PlusJakartaSansSemiBold,
        fontSize: SIZES.medium,
        color: COLORS.brand.primary
    },
    confirmTitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        color: COLORS.brand.secondary,
        fontSize: SIZES.font,
        lineHeight: 16,
        paddingVertical: 10
    },
    labelTextBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6
    },
    dataOutoutText: {
        fontFamily: FONT.PlusJakartaSansSemiBold,
        color: COLORS.neutrals.charcoal,
        fontSize: SIZES.small,
        lineHeight: 14,
        textAlign: 'right'
    },
    secondaryBtn: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.lightSecondary,
        backgroundColor: COLORS.brand.secondary,
        alignSelf: 'center'
    },
    secondaryBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.coconut,
        lineHeight: 22,
        fontWeight: '600'
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
    dropdown: {
        height: 40,
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