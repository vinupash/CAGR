import React from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { assets, COLORS, FONT, SHADOWS, SIZES } from '../constants';
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get('window').width

const UserRegistrationDetail = ({
    onPress
}) => {
    const navigation = useNavigation();
    return (
        <View style={styles.boxNavigationSection}>
            <View
                // source={assets.RegistrationDetailBG}
                style={styles.ImageBackground}
            >
                <View style={styles.navigationBox}>
                    <Text style={styles.title}>Complete your registration!</Text>
                    <Text style={styles.subText}>Your profile is 55% incomplete.  Complete it to start investing easily</Text>
                    <TouchableOpacity
                        style={{ borderRadius: 40 / 2, height: 40, width: 216, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.brand.secondary, ...SHADOWS.light }}
                        onPress={onPress}
                    // onPress={() => navigation.navigate('ProfileUpdateNavigation')}
                    >
                        <Text style={{
                            fontFamily: FONT.PlusJakartaSansSemiBold,
                            color: COLORS.neutrals.coconut,
                            fontSize: SIZES.font,
                            lineHeight: 18
                        }}>Continue Registration</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default UserRegistrationDetail

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
        marginBottom: 10,
        width: width - 20,
        minHeight: 156,
        justifyContent: 'center',
        borderRadius: 8,
        padding: 10,
    },
    ImageBackground: {
        width: width - 20,
        minHeight: 156,
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
        paddingBottom: 10,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: 15
    }
})