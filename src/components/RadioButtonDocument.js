import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg';
import RadioActive from '../../assets/images/RadioActive';
import RadioInactive from '../../assets/images/RadioInactive';
import { FONT, COLORS, SIZES } from '../constants';

const RadioButtonDocument = ({
    data,
    onSelect
}) => {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };

    return (
        <View>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => selectHandler(item.id)}
                        style={{ marginTop: 10, marginBottom: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'flex-start' }}
                    >
                        {item.id === userOption ? <SvgXml xml={RadioActive} width={14} height={14} style={{ marginTop: 5 }} /> : <SvgXml xml={RadioInactive} width={14} height={14} style={{ marginTop: 5 }} />}
                        <Text style={styles.nomineeText}>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default RadioButtonDocument

const styles = StyleSheet.create({
    unselected: {
        color: 'yellow'
    },
    selected: {
        color: 'red'
    },
    nomineeText: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
        marginLeft: 8
    },
})

