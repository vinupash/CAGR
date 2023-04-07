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
    FlatList,
    ActivityIndicator,
    Animated
} from 'react-native';
import { AMCMasterApi, FundDivOptionsApi, GetAllInvestFundListApi, GetAllInvestFundListFilterApi, SchemeMasterApi } from '../../../constants/AllApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SHADOWS, SIZES, FONT, assets } from '../../../constants';
import { BackBtnBlue } from '../../../components/CustomButton';
import { InputSearch } from '../../../components/CustomInput';
import { Dropdown } from 'react-native-element-dropdown';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Invest = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const [user_id, setUser_id] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isSearchData, setSearchData] = useState('')

    const [valueAMCMaster, setValueAMCMaster] = useState(null);
    const [isFocusAMCMaster, setIsFocusAMCMaster] = useState(false);
    const [isDataAMCMasterList, setDataAMCMasterList] = useState([]);

    const [valueSchemeMaster, setValueSchemeMaster] = useState(null);
    const [isFocusSchemeMaster, setIsFocusSchemeMaster] = useState(false);
    const [isDataSchemeMasterList, setDataSchemeMasterList] = useState([]);

    const [valueFundDivOptions, setValueFundDivOptions] = useState(null);
    const [isFocusFundDivOptions, setIsFocusFundDivOptions] = useState(false);
    const [isDataFundDivOptionsList, setDataFundDivOptionsList] = useState([]);

    const [isGetAllInvestFundList, setGetAllInvestFundList] = useState([])
    const [isGetAllInvestFund, setGetAllInvestFund] = useState([])

    const [errorMessage, setErrorMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isFilterTitle, setFilterTitle] = useState('Popular funds');

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

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const userDataAfterMPin = await AsyncStorage.getItem("userDataAfterMPin");
            const transformedUserLoginData = JSON.parse(userDataAfterMPin);
            // console.log(transformedUserLoginData);
            setUser_id(transformedUserLoginData.user_id)
            const userId = transformedUserLoginData.user_id;
            const resultAMCMaster = await AMCMasterApi();
            const resultSchemeMaster = await SchemeMasterApi();
            const resultFundDivOptionsApi = await FundDivOptionsApi();
            const resultInvestFund = await GetAllInvestFundListApi(userId);
            setLoading(false)
            // console.log('resultAMCMaster--->', resultAMCMaster.result);
            // console.log('resultSchemeMaster--->', resultSchemeMaster.result);
            // console.log('resultFundDivOptionsApi--->', resultFundDivOptionsApi.result);
            // console.log('resultInvestFund--->', resultInvestFund.result.arrFunds);

            const isDataAMCMasterList = [...resultAMCMaster.result];
            const newArrayListAMCMAster = isDataAMCMasterList.map((item) => {
                return { label: item.amcname, value: item.amccode }
            })
            setDataAMCMasterList(newArrayListAMCMAster)

            const isDataSchemeMasterList = [...resultSchemeMaster.result];
            const newArrayListSchemeMaster = isDataSchemeMasterList.map((item) => {
                return { label: item.value, value: item.key }
            })
            setDataSchemeMasterList(newArrayListSchemeMaster)

            const isDataFundDivOptionsList = [...resultFundDivOptionsApi.result];
            const newArrayListFundDivOption = isDataFundDivOptionsList.map((item) => {
                return { label: item.value, value: item.key }
            })
            setDataFundDivOptionsList(newArrayListFundDivOption)
            setGetAllInvestFundList(resultInvestFund.result.arrFunds)
            setGetAllInvestFund(resultInvestFund.result.arrFunds)
        };
        fetchDataAsync();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const searchSipBox = () => {
        return (
            <View>
                <View style={{ marginTop: 0 }}>
                    <InputSearch
                        placeholder="Search..."
                        value={isSearchData}
                        setValue={setSearchData}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <TouchableOpacity
                            style={{ marginTop: 5, marginRight: 5 }}
                            onPress={ClearAll}
                        >
                            <Text style={{ color: COLORS.brand.secondary, fontFamily: FONT.PlusJakartaSansRegular, fontSize: SIZES.font }}>Clear all</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 0 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Fund House</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={isDataAMCMasterList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusAMCMaster ? 'Fund House' : '...'}
                        searchPlaceholder="Search..."
                        value={valueAMCMaster}
                        onFocus={() => setIsFocusAMCMaster(true)}
                        onBlur={() => setIsFocusAMCMaster(false)}
                        onChange={item => {
                            setValueAMCMaster(item.value);
                            setIsFocusAMCMaster(false);
                        }}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Fund Type</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={isDataSchemeMasterList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusSchemeMaster ? 'Fund Type' : '...'}
                        searchPlaceholder="Search..."
                        value={valueSchemeMaster}
                        onFocus={() => setIsFocusSchemeMaster(true)}
                        onBlur={() => setIsFocusSchemeMaster(false)}
                        onChange={item => {
                            setValueSchemeMaster(item.value);
                            setIsFocusSchemeMaster(false);
                        }}
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.secureTextBox}>
                        <Text style={styles.inputLabel}>Fund Name</Text>
                        <Text style={styles.inputLabelRight}></Text>
                    </View>
                    <Dropdown
                        style={[styles.dropdown]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={isDataFundDivOptionsList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocusFundDivOptions ? 'Fund Name' : '...'}
                        searchPlaceholder="Search..."
                        value={valueFundDivOptions}
                        onFocus={() => setIsFocusFundDivOptions(true)}
                        onBlur={() => setIsFocusFundDivOptions(false)}
                        onChange={item => {
                            setValueFundDivOptions(item.value);
                            setIsFocusFundDivOptions(false);
                        }}
                    />
                </View>
            </View>
        )
    }

    const FundItem = ({ title, investedAmount, bankImage, nav, sip_minamount, invest_id, fund_growth, fund_class }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('InvestStack',
                {
                    screen: 'Invest Details',
                    params: {
                        fund_id: invest_id,
                        fund_name: title,
                        fund_investedAmount: investedAmount,
                        fund_nav: nav,
                        fund_SIP_amount: sip_minamount,
                        fund_growth: fund_growth,
                        fund_class: fund_class
                    }
                }
            )}

            style={styles.fundDetailsBox}
        >
            <View style={styles.fundDetailsBoxSection}>
                <View style={{ width: 42 }}>
                    <Image
                        source={assets.Axis}
                        style={{ height: 32, width: 32 }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.fundDetails}>
                        <Text numberOfLines={1} style={styles.fundDetailsTitle}>{title}</Text>
                        {/* <TouchableOpacity style={styles.funDetailsEllipsis}><SvgXml xml={Ellipsis} width={8} height={16} /></TouchableOpacity> */}
                    </View>
                    <View style={styles.fundBox}>
                        <View style={styles.fundBoxSection}>
                            <Text style={styles.sectionTitle}>min. Installment</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <RupeeIcon
                                    name="rupee"
                                    type="FontAwesome"
                                    style={[styles.sectionValue, { marginRight: 3, lineHeight: 29 }]}
                                /> */}
                                <Text style={styles.sectionValue}>₹{Intl.NumberFormat('en-IN').format(investedAmount)}</Text>
                            </View>
                        </View>
                        <View style={styles.fundBoxSection}>
                            <Text style={styles.sectionTitle}>min. SIP</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {/* <RupeeIcon
                                    name="rupee"
                                    type="FontAwesome"
                                    style={[styles.sectionValue, { marginRight: 3, lineHeight: 29 }]}
                                /> */}
                                <Text style={styles.sectionValue}>₹{Intl.NumberFormat('en-IN').format(sip_minamount)}</Text>
                            </View>
                        </View>
                        <View style={styles.fundBoxSection}>
                            <Text style={styles.sectionTitle}>Current NAV</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.sectionValue, { color: '#14B81A' }]}>₹{parseFloat(nav).toFixed(2)}</Text>
                                {/* <PercentIcon
                                    name="percent"
                                    type="FontAwesome"
                                    style={[styles.sectionValue, { marginLeft: 2, lineHeight: 28, fontSize: 12, color: '#14B81A' }]}
                                /> */}
                            </View>

                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderFundItem = ({ item }) => (
        <FundItem title={item.schname} investedAmount={item.minamount} bankImage={item.bankImage} sip_minamount={item.sip_minamount} nav={item.nav} invest_id={item.id} fund_growth={item.fundgrowth} fund_class={item.fundclas} />
    );

    const FundData = () => {
        return (
            <View >
                <FlatList
                    horizontal={false}
                    scrollEnabled={true}
                    numColumns={1}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={isGetAllInvestFundList}
                    renderItem={renderFundItem}
                    keyExtractor={item => item.id}
                />
            </View >
        )
    }

    const ClearAll = () => {
        setGetAllInvestFundList(isGetAllInvestFund)
        setSearchData('');
        setFilterTitle('Popular funds')
        setValueAMCMaster(null)
        setValueFundDivOptions(null)
        setValueSchemeMaster(null)
        return;
    }

    // console.log(valueAMCMaster, valueSchemeMaster, valueFundDivOptions);

    const getFilteredData = async () => {
        const filteredProducts = isGetAllInvestFundList.filter((item) => {
            if (item.schname.toLowerCase().match(isSearchData) || item.fundgrowth.match(valueFundDivOptions) || item.schname.match(isSearchData) || item.amccode.match(valueAMCMaster) || item.fundclas.match(valueSchemeMaster)) {
                return item;
            }
        });
        // console.log('filteredProducts--->', filteredProducts);
        setGetAllInvestFundList(filteredProducts)
        // setLoading(true)
        // console.log(user_id);
        // const response = await GetAllInvestFundListFilterApi(user_id);
        // setLoading(false)
        // console.log('response--->', response);
        setFilterTitle('Search result')
    }

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
                <View style={{ height: 140, backgroundColor: COLORS.brand.primary, width: windowWidth, paddingHorizontal: 10, paddingVertical: 5 }}>
                    <BackBtnBlue
                        screenTitle='Invest'
                        onPress={navigation.goBack}
                    />
                </View>
                <View style={[styles.fundDetailsSection, { top: isKeyboardVisible ? '14%' : '10%' }]}>
                    <View style={{ backgroundColor: COLORS.neutrals.coconut, paddingHorizontal: 10, borderRadius: 10, ...SHADOWS.light, paddingBottom: 10 }}>
                        {searchSipBox()}
                        <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={getFilteredData}
                        >
                            <Text style={styles.secondaryBtnText}>Search</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 5, flex: 1 }}>
                        <Text style={{ fontSize: SIZES.medium, fontFamily: FONT.PlusJakartaSansSemiBold, color: COLORS.brand.black, marginBottom: 10 }}>{isFilterTitle}</Text>
                        {
                            isGetAllInvestFundList.length === 0 ?
                                <>
                                    <Text style={{ fontSize: SIZES.medium, textAlign: 'center', fontFamily: FONT.PlusJakartaSansSemiBold, color: COLORS.feedback.error, marginTop: 20 }}>No record fonund...!</Text>
                                </>
                                :
                                <>{FundData()}</>
                        }
                    </View>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default Invest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    topSection: {
        flex: 6,
        position: 'relative'
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
    fundDetailsSection: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        width: windowWidth - 20,
        bottom: '5%',
    },
    secondaryBtn: {
        width: windowWidth - 40,
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.lightSecondary,
        backgroundColor: COLORS.brand.secondary,
        marginTop: 20
    },
    secondaryBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.coconut,
        lineHeight: 22,
        fontWeight: '600'
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
    fundDetailsBox: {
        width: '100%',
        marginVertical: 5,
        backgroundColor: COLORS.neutrals.coconut,
        borderRadius: 10,
        ...SHADOWS.light,
        padding: 10,
        width: windowWidth - 22,
        alignSelf: 'center'
    },
    fundDetailsBoxSection: {
        flexDirection: 'row'
    },
    fundDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fundDetailsTitle: {
        color: COLORS.brand.primary,
        fontFamily: FONT.PlusJakartaSansSemiBold,
        flex: 1
    },
    funDetailsEllipsis: {
        width: 40,
        alignItems: 'flex-end'
    },
    fundBox: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        marginTop: 8,
    },
    fundBoxSection: {
        width: '33.33%',
    },
    sectionTitle: {
        fontSize: SIZES.base,
        color: COLORS.neutrals.thunder,
        fontFamily: FONT.PlusJakartaSansRegular,
        paddingBottom: 2
    },
    sectionValue: {
        fontSize: SIZES.font,
        color: COLORS.neutrals.charcoal,
        lineHeight: 24,
        fontFamily: FONT.PlusJakartaSansSemiBold,
    },
})