import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';

const MaritalRadioButton = ({
    data,
    onSelect
}) => {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };

    return (
        <View style={styles.selectSection}>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => selectHandler(item.value)}
                        style={
                            item.value === userOption ? styles.selected : styles.unselected
                        }
                    >
                        <Text style={styles.selectValueTitle}>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default MaritalRadioButton

const styles = StyleSheet.create({
    unselected: {
        width: '31%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 15,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: COLORS.neutrals.pearl,
        backgroundColor: COLORS.neutrals.coconut
    },
    selected: {
        width: '31%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: 15,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: COLORS.brand.secondary,
        backgroundColor: COLORS.neutrals.dawn
    },
    selectValueTitle: {
        fontSize: SIZES.font,
        letterSpacing: 0.2,
        fontFamily: FONT.PlusJakartaSansRegular,
        color: COLORS.brand.black,
        textAlign: 'center',
        lineHeight: 18
    },
    selectSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
})