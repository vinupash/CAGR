import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../constants';

const TitleSection = ({ titleText, subText }) => {
    return (
        <View style={styles.titleBox}>
            <Text style={styles.pageTitle}>{titleText}</Text>
            <Text style={styles.pageSubtitle}>{subText}</Text>
        </View>
    )
}

export default TitleSection

const styles = StyleSheet.create({
    titleBox: {
        width: '100%',
        minHeight: 120,
        marginTop: 10,
        // borderWidth: 1,
        marginBottom: 5
    },
    pageTitle: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.primary,
        textAlign: 'left',
        // letterSpacing: -0.4,
        lineHeight: 38,
    },
    pageSubtitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
        marginTop: 5
    }
})