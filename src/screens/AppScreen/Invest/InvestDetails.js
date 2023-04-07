import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, SIZES, FONT, SHADOWS, assets } from '../../../constants';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const InvestDetails = ({ navigation, route }) => {
    const [isLoading, setLoading] = useState(false);
    const { fund_id, fund_investedAmount, fund_nav, fund_SIP_amount, fund_growth, fund_class, fund_name } = route.params;

    console.log('fund_id--->', fund_id, fund_investedAmount, fund_nav, fund_SIP_amount, fund_growth, fund_class, fund_name);

    return (
        <SafeAreaView style={styles.container}>
            <BackBtn
                onPress={() => navigation.goBack()}
            />
            <View style={styles.topSection}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.inputSection}
                >
                    <View style={styles.fundDetailsSection}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Image source={assets.Axis} style={{ width: 40, height: 40 }} />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontFamily: FONT.PlusJakartaSansSemiBold, fontSize: SIZES.medium, color: COLORS.brand.primary }}>{fund_name}</Text>
                            </View>
                        </View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Min. Invest Amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputLabelRight, { fontSize: SIZES.medium, color: COLORS.feedback.success }]}>₹{Intl.NumberFormat('en-IN').format(fund_investedAmount)}</Text>
                            </View>
                        </View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Min. SIP Amount</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputLabelRight, { fontSize: SIZES.medium, color: COLORS.feedback.success }]}>₹{Intl.NumberFormat('en-IN').format(fund_SIP_amount)}</Text>
                            </View>
                        </View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Fund Growth</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputLabelRight, { color: COLORS.neutrals.charcoal }]}>{fund_growth}</Text>
                            </View>
                        </View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Fund Class</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputLabelRight, { color: COLORS.neutrals.charcoal }]}>{fund_class}</Text>
                            </View>
                        </View>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Current NAV</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.inputLabelRight, { color: COLORS.neutrals.charcoal }]}>₹{parseFloat(fund_nav).toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View >

            <View style={styles.bottomSectionPage}>
                <SecondaryBtn
                    btnText='Invest'
                    onPress={() => navigation.navigate('InvestStack',
                        {
                            screen: 'Invest Fund',
                            params: {
                                id_fund: fund_id,
                            }
                        }
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default InvestDetails;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.background,
    },
    bottomSectionPage: {
        flex: 2,
        justifyContent: 'center',
    },
    topSection: {
        flex: 6,
        width: windowWidth - 20,
    },
    fundDetailsSection: {
        alignSelf: 'center',
        width: windowWidth - 22,
        backgroundColor: COLORS.neutrals.coconut,
        padding: 16,
        borderRadius: 10,
        ...SHADOWS.light,
        marginVertical: 10,
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
})