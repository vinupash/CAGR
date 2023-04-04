import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import eye from '../../assets/images/eye';
import Eyeoff from '../../assets/images/Eyeoff';
import { COLORS, FONT, SIZES } from '../constants';
// import RupeeIcon from 'react-native-vector-icons/FontAwesome';
import Search from '../../assets/images/Search';

export const Input = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.neutrals.thunder}
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </>
    )
}

export const InputAmount = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBoxAmount}>
                {/* <RupeeIcon
                    name="rupee"
                    type="FontAwesome"
                    style={[styles.sectionValue, { marginRight: 3 }]}
                /> */}
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.neutrals.thunder}
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </>
    )
}

export const InputSearch = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={[styles.inputBox, { flexDirection: 'row' }]}>
                <TextInput
                    style={[styles.inputStyle, { flex: 1 }]}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.neutrals.thunder}
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
                <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <SvgXml xml={Search} width={24} height={24} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
        marginBottom: 5,
        marginHorizontal: 5
    },
    inputBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    inputStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
        flex: 1,
    },
    inputBoxAmount: {
        height: 40,
        width: '100%',
        borderBottomWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionValue: {
        fontSize: SIZES.font,
        color: COLORS.neutrals.charcoal,
        lineHeight: 24,
        fontFamily: FONT.PlusJakartaSansSemiBold,
    }
})