import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, FONT } from '../constants';


const width = Dimensions.get('window').width
export default function CustomSwitchSip({
    selectionMode,
    option1,
    option2,
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
                height: 36,
                width: '70%',
                backgroundColor: '#F5F6F9',
                borderRadius: 36 / 2,
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                borderColor: COLORS.neutrals.pearl,
                borderWidth: 0.8
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1 ? COLORS.brand.secondary : '#F5F6F9',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 36 / 2,
                    borderBottomLeftRadius: 36 / 2,
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? COLORS.neutrals.coconut : COLORS.neutrals.thunder,
                        fontSize: 14,
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
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? COLORS.brand.secondary : '#F5F6F9',
                    borderTopRightRadius: 36 / 2,
                    borderBottomRightRadius: 36 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 2 ? COLORS.neutrals.coconut : COLORS.neutrals.thunder,
                        fontSize: 14,
                        fontFamily: FONT.PlusJakartaSansRegular,
                        lineHeight: 18
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    );
}