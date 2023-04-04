import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants';
import { SvgXml } from 'react-native-svg';
import BackIcon from '../../assets/images/BackIcon';
import BackIconWhite from '../../assets/images/BackIconWhite';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const SecondaryBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={onPress}
        >
            <Text style={styles.secondaryBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export const PrimaryBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onPress}
        >
            <Text style={styles.primaryBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export const BackBtn = ({
    onPress
}) => {
    return (
        <View style={styles.backBtnSection}>
            <TouchableOpacity
                style={styles.backBtn}
                onPress={onPress}
            >
                <SvgXml xml={BackIcon} width={22} height={28} />
            </TouchableOpacity>
        </View>
    )
}

export const BackBtnBlue = ({
    onPress,
    screenTitle
}) => {
    return (
        <View style={[styles.backBtnSection, { backgroundColor: COLORS.brand.primary }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[styles.backBtn, { backgroundColor: '#020F2F' }]}
                    onPress={onPress}
                >
                    <SvgXml xml={BackIconWhite} width={22} height={28} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, fontFamily: FONT.PlusJakartaSansSemiBold, fontSize: 20, lineHeight: 24, color: '#F5F6F9' }}>{screenTitle}</Text>
            </View>
        </View>
    )
}

export const WhiteBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.whiteBtn}
            onPress={onPress}
        >
            <Text style={styles.whiteBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export const TransparentBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.transparentBtn}
            onPress={onPress}
        >
            <Text style={styles.transparentBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    secondaryBtn: {
        width: windowWidth - 20,
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
    primaryBtn: {
        width: windowWidth - 20,
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.lightPrimary,
        backgroundColor: COLORS.brand.primary,
    },
    primaryBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.coconut,
        lineHeight: 22,
        fontWeight: '600'
    },
    backBtn: {
        width: 38,
        height: 38,
        borderRadius: 38 / 2,
        ...SHADOWS.light,
        backgroundColor: COLORS.neutrals.coconut,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backBtnSection: {
        height: 45,
        justifyContent: 'center',
        // marginTop: 10
        width: windowWidth - 20,
        alignSelf: 'center'
    },
    whiteBtn: {
        width: windowWidth - 20,
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.lightSecondary,
        backgroundColor: COLORS.neutrals.coconut
    },
    whiteBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.medium,
        color: COLORS.brand.secondary,
        lineHeight: 22,
        fontWeight: '600'
    },
    transparentBtn: {
        alignItems: 'center',
        width: windowWidth - 20,
        paddingVertical: 14,
        borderRadius: 24,
        marginBottom: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.neutrals.coconut
    },
    transparentBtnText: {
        textAlign: 'center',
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.medium,
        color: COLORS.neutrals.coconut,
        lineHeight: 18,
        fontWeight: '400',
        marginLeft: 8
    },
})