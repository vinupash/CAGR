import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants';

export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    option3,
    onSelectSwitch,
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = value => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: "wrap",
                justifyContent: 'space-between',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    // flex: 1,
                    backgroundColor: getSelectionMode == 1 ? COLORS.brand.secondary : '#020F2F',
                    borderRadius: 28 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '31%',
                    height: 30,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 1 ? COLORS.brand.secondary : COLORS.brand.black,
                    ...SHADOWS.light,
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? '#F5F6F9' : '#B3BBCE',
                        fontSize: SIZES.font,
                        fontFamily: FONT.PlusJakartaSansRegular,
                        lineHeight: 18
                    }}>
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    // flex: 1,
                    backgroundColor: getSelectionMode == 2 ? COLORS.brand.secondary : '#020F2F',
                    borderRadius: 28 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '31%',
                    height: 30,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 2 ? COLORS.brand.secondary : COLORS.brand.black,
                    ...SHADOWS.light,
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 3 ? '#B3BBCE' : '#F5F6F9' && getSelectionMode == 2 ? '#F5F6F9' : '#B3BBCE',
                        fontSize: SIZES.font,
                        fontFamily: FONT.PlusJakartaSansRegular,
                        lineHeight: 18
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(3)}
                style={{
                    // flex: 1,
                    backgroundColor: getSelectionMode == 3 ? COLORS.brand.secondary : '#020F2F',
                    borderRadius: 28 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '31%',
                    height: 30,
                    borderWidth: 1,
                    borderColor: getSelectionMode == 3 ? COLORS.brand.secondary : COLORS.brand.black,
                    ...SHADOWS.light,
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 3 ? '#F5F6F9' : '#B3BBCE',
                        fontSize: SIZES.font,
                        fontFamily: FONT.PlusJakartaSansRegular,
                        lineHeight: 18
                    }}>
                    {option3}
                </Text>
            </TouchableOpacity>
        </View>
    );
}