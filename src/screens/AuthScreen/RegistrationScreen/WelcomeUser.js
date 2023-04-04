import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated, ImageBackground } from 'react-native';
import { BackBtn, SecondaryBtn, TransparentBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS, assets } from '../../../constants';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const WelcomeUser = ({ navigation, route }) => {
    const { user_id } = route.params;
    // console.log(user_id);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <ImageBackground
                source={assets.BackgroundImage}
                style={styles.ImageBackground}
            >
                <View style={[styles.topSection]}>
                    {/* <BackBtn onPress={navigation.goBack} /> */}
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={styles.titleBox}>
                            <Text style={styles.pageTitle}>Welcome!</Text>
                            <Text style={styles.pageSubtitle}>We have succesfully created your account. To start with {'\n'}Investing, you’ll have to complete the registration {'\n'}process.</Text>
                        </View>

                    </ScrollView>
                </View>

                <View style={styles.bottomSectionPage}>
                    <View style={{ marginBottom: 20 }}>
                        <SecondaryBtn
                            btnText='Complete registration'
                            onPress={() => navigation.navigate('ProfileUpdateNavigation',
                                {
                                    screen: "Address Details",
                                    params: {
                                        user_id: user_id,
                                        profile_update: true
                                    }
                                })}
                        />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <TransparentBtn
                            btnText='Go to Dashboard'
                        // onPress={submitData}
                        />
                    </View>

                </View>

            </ImageBackground>
        </SafeAreaView>
    )
}

export default WelcomeUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    topSection: {
        flex: 6,
        width: windowWidth - 20,
        alignSelf: 'center',
    },
    bottomSectionPage: {
        flex: 3,
        justifyContent: 'center',
    },
    secureTextBox: {
        marginBottom: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
    },
    inputLabelRight: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.secondary,
        fontWeight: '600'
    },
    inputStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
        flex: 1
    },
    inputBox: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    snackbar: {
        backgroundColor: COLORS.feedback.errorBG,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1,
        height: 45,
        padding: 5,
        justifyContent: 'center'
    },
    snackbarText: {
        color: COLORS.feedback.error,
        fontSize: SIZES.font,
        fontFamily: FONT.PlusJakartaSansRegular,
        textAlign: 'center'
    },
    secureTextBox: {
        marginBottom: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
    },
    inputLabelRight: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.secondary,
        fontWeight: '600'
    },
    textInputBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    pageTitle: {
        marginTop: StatusBar.currentHeight,
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.neutrals.coconut,
        textAlign: 'left',
        letterSpacing: -0.4,
        lineHeight: 38,
    },
    pageSubtitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: COLORS.neutrals.coconut,
        marginTop: 5
    },
    underlineStyleBase: {
        height: 60,
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.feedback.success,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl
    },
    inputDateBox: {
        height: 45,
        width: '100%',
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        justifyContent: 'center'
    },
    ImageBackground: {
        width: windowWidth,
        backgroundColor: COLORS.brand.primary,
        resizeMode: 'contain',
        height: windowHeight,
    },
})