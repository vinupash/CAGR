import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icon from '../../../assets/images/Icon';
import { FONT, SIZES, COLORS } from '../../constants';
const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <View style={styles.logoSection}>
                <SvgXml xml={Icon} width={40} height={40} />
                <Text style={styles.logoName}>CAGRfunds</Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    logoSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoName: {
        marginLeft: 5,
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.primary
    }
})