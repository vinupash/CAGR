import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { assets, COLORS, FONT, SHADOWS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get('window').width

const UserUnderReview = ({
    onPress
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.boxNavigationSection}>
            <View
                style={styles.ImageBackground}
            >
                <View style={styles.navigationBox}>
                    <Text style={styles.title}>Profile under review!</Text>
                    <Text style={styles.subText}>Your profile is 55% incomplete.  Complete it to start investing easily</Text>
                </View>
            </View>
        </View>
    )
}

export default UserUnderReview

const styles = StyleSheet.create({
    boxNavigationSection: {
        marginTop: 10,
        width: width - 20,
        alignSelf: 'center',
        // flexDirection: 'row',
        // flexWrap: "wrap",
        // justifyContent: 'space-between',
        borderRadius: 8,
        // borderWidth: 1
    },
    navigationBox: {
        // marginBottom: 10,
        width: width - 20,
        minHeight: 100,
        justifyContent: 'center',
        borderRadius: 8,
        padding: 10,
    },
    ImageBackground: {
        width: width - 20,
        minHeight: 100,
        backgroundColor: COLORS.brand.primary,
        resizeMode: 'contain',
        borderRadius: 8,
        ...SHADOWS.light,
    },
    title: {
        color: COLORS.neutrals.coconut,
        fontFamily: FONT.PlusJakartaSansSemiBold,
        fontSize: 20,
        paddingBottom: 3,
        lineHeight: 24,
    },
    subText: {
        color: COLORS.neutrals.cloud,
        // paddingBottom: 10,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: 15
    }
})