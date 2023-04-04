import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import { BackBtn, SecondaryBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SIZES, SHADOWS } from '../../../constants';
import TitleSection from '../../../components/TitleSection';
import { BASE_URL } from '../../../constants/api';
import { AddressProofType } from '../../../constants/AllApiCall';
import { Dropdown } from 'react-native-element-dropdown';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
import * as ImagePicker from 'react-native-image-picker';
import RadioButtonDocument from '../../../components/RadioButtonDocument';

const Documents = ({ navigation, route }) => {
    const { user_id, profile_update } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessMessage, setSuccessMessage] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [isDataAddressList, setDataAddressList] = useState([]);
    const [valueAddress, setValueAddress] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [imageAddressProof, setImageAddressProof] = useState('');
    const [imageCheque, setImageCheque] = useState('');
    const [imagePanCard, setImagePanCard] = useState('');
    const [fileChequeData, setfileChequeData] = useState(null)
    const [fileAddressProofData, setfileAddressProofData] = useState(null)
    const [filePanCardData, setfilePanCardData] = useState(null)

    useEffect(() => {
        const fetchDataAsync = async () => {
            setLoading(true)
            const resultAddress = await AddressProofType();
            setLoading(false)
            // console.log(resultAddress.result);
            const isDataAddressList = [...resultAddress.result];
            const newArrayListAddressProof = isDataAddressList.map((item) => {
                return { label: item.fldv_proof_name, value: item.fldi_proof_id }
            })
            setDataAddressList(newArrayListAddressProof)
        };
        fetchDataAsync();
    }, []);

    const addImageAddressProof = () => {
        // setEditProfileImage(!editProfileImage)
        const options = {
            storageOptions: {
                path: 'image'
            },
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 300,
            maxHeight: 150,
            quality: 1,
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response image path--->', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
                // setEditProfileImage(editProfileImage)
            } else {
                if (!response.uri) {
                    const resitem = response && response.assets[0]
                    const img = {
                        uri: resitem.uri,
                        name: resitem.fileName,
                        type: resitem.type
                    }
                    setfileAddressProofData(img)
                    setImageAddressProof(response.assets[0].uri)
                }
            }

        })
    }

    const addImageCheque = () => {
        // setEditProfileImage(!editProfileImage)
        const options = {
            storageOptions: {
                path: 'image'
            },
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 300,
            maxHeight: 150,
            quality: 1,
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response image path Cheque--->', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
                // setEditProfileImage(editProfileImage)
            } else {
                if (!response.uri) {
                    const resitem = response && response.assets[0]
                    const img = {
                        uri: resitem.uri,
                        name: resitem.fileName,
                        type: resitem.type
                    }
                    setfileChequeData(img)
                    setImageCheque(response.assets[0].uri)
                }
            }

        })
    }

    const addImagePanCard = () => {
        // setEditProfileImage(!editProfileImage)
        const options = {
            storageOptions: {
                path: 'image'
            },
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 300,
            maxHeight: 150,
            quality: 1,
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response image path--->', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
                // setEditProfileImage(editProfileImage)
            } else {
                if (!response.uri) {
                    const resitem = response && response.assets[0]
                    const img = {
                        uri: resitem.uri,
                        name: resitem.fileName,
                        type: resitem.type
                    }
                    setfilePanCardData(img)
                    setImagePanCard(response.assets[0].uri)
                }
            }

        })
    }

    const data = [
        {
            key: '1',
            id: '1',
            title: '1',
            value: 'I am a politically exposed person',
        },
        {
            key: '2',
            id: '2',
            title: 'I am related to a politically exposed person',
            value: 'I am related to a politically exposed person',
        },
        {
            key: '3',
            id: '3',
            title: 'Not applicable',
            value: 'Not applicable',
        }
    ];


    const handleErrorMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setErrorMessage('');
        }, 3000);
    };

    const handleSuccessMsg = () => {
        Animated.timing(
            fadeAnim,
            {
                toValue: isVisible ? 0 : 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const submitDocuments = async () => {
        setLoading(true)
        try {

            if (!valueAddress) {
                handleErrorMsg()
                setErrorMessage('Please select address type')
                return
            }

            if (!imageCheque) {
                handleErrorMsg()
                setErrorMessage('Please uploade copy of a cancelled cheque')
            }

            if (!imageAddressProof) {
                handleErrorMsg()
                setErrorMessage('Please uploade address proof iamge')
                return
            }
            if (!imagePanCard) {
                handleErrorMsg()
                setErrorMessage('Please uploade pan card iamge')
                return
            }

            if (!option) {
                handleErrorMsg()
                setErrorMessage('Please select optin')
                return
            }
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

            var formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("cheque", fileChequeData, imageCheque);
            formdata.append("address_proof", fileAddressProofData, imageAddressProof);
            formdata.append("pan_card", filePanCardData, imagePanCard);
            formdata.append("political_relation", option);
            formdata.append("address_proof_type", selectedAddressType);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            const response = await fetch(BASE_URL + "register/uploaddocuments", requestOptions);
            const json = await response.json();
            console.log('json --->', json);
            if (json.status === true) {
                alert(json.message)
                handleSuccessMsg()
                setSuccessMessage(json.message)
                navigation.navigate('Registration Completed', { user_id: user_id, profile_update: true })
            } else {
                handleErrorMsg()
                setErrorMessage(json.message)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }


    console.log(user_id, profile_update);
    // console.log(data);

    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            {errorMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim
                }]}>
                    <Text style={styles.snackbarText}>{errorMessage}</Text>
                </Animated.View>
            )}

            {isSuccessMessage !== '' && (
                <Animated.View style={[styles.snackbar, {
                    opacity: fadeAnim, backgroundColor: COLORS.feedback.successBG
                }]}>
                    <Text style={[styles.snackbarText, { color: COLORS.feedback.success }]}>{isSuccessMessage}</Text>
                </Animated.View>
            )}
            <View style={[styles.topSection]}>
                <BackBtn onPress={navigation.goBack} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <TitleSection
                        titleText='Documents'
                        subText='We’ll need a copy of your documents'
                    />

                    <View style={{ marginBottom: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Address proof type</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        <Dropdown
                            style={[styles.dropdown]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={isDataAddressList}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Address proof type' : '...'}
                            searchPlaceholder="Search..."
                            value={valueAddress}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValueAddress(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    {
                        !imageAddressProof ?
                            <TouchableOpacity
                                style={styles.documentUploadSection}
                                onPress={addImageAddressProof}
                            >
                                <Text style={styles.documentUploadText}>Upload</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={addImageAddressProof}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderStyle: 'dotted',
                                    borderRadius: 5,
                                    backgroundColor: COLORS.neutrals.coconut,
                                    borderColor: COLORS.neutrals.candy,
                                    paddingVertical: 5
                                }}>
                                {imageAddressProof && (<Image source={{ uri: imageAddressProof }} style={{ width: 300, height: 150 }} />)
                                }
                            </TouchableOpacity>
                    }

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Copy of a cancelled cheque</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>
                        {
                            !imageCheque ?
                                <TouchableOpacity
                                    style={styles.documentUploadSection}
                                    onPress={addImageCheque}
                                >
                                    <Text style={styles.documentUploadText}>Upload</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={addImageCheque}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderStyle: 'dotted',
                                        borderRadius: 5,
                                        backgroundColor: COLORS.neutrals.coconut,
                                        borderColor: COLORS.neutrals.candy,
                                        paddingVertical: 5
                                    }}>
                                    {imageCheque && (<Image source={{ uri: imageCheque }} style={{ width: 300, height: 150 }} />)
                                    }
                                </TouchableOpacity>
                        }

                    </View>

                    <View style={{ marginTop: 10 }}>
                        <View style={styles.secureTextBox}>
                            <Text style={styles.inputLabel}>Copy of a PAN</Text>
                            <Text style={styles.inputLabelRight}></Text>
                        </View>

                        {/* <TouchableOpacity
                                style={styles.documentUploadSection}
                            >
                                <Text style={styles.documentUploadText}>Upload</Text>
                            </TouchableOpacity> */}
                        {
                            !imagePanCard ?
                                <TouchableOpacity
                                    style={styles.documentUploadSection}
                                    onPress={addImagePanCard}
                                >
                                    <Text style={styles.documentUploadText}>Upload</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    onPress={addImagePanCard}
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderStyle: 'dotted',
                                        borderRadius: 5,
                                        backgroundColor: COLORS.neutrals.coconut,
                                        borderColor: COLORS.neutrals.candy,
                                        paddingVertical: 5
                                    }}>
                                    {imagePanCard && (<Image source={{ uri: imagePanCard }} style={{ width: 300, height: 150 }} />)
                                    }
                                </TouchableOpacity>
                        }
                    </View>

                    <View style={{ marginTop: 10 }}>

                        <RadioButtonDocument
                            data={data}
                            onSelect={(value) => setOption(value)}
                        />
                    </View>

                    <View style={{ marginTop: 20, marginBottom: 30 }}>
                        <SecondaryBtn
                            btnText='Upload'
                            // onPress={() => navigation.navigate('Registration Completed', { user_id: user_id, profile_update: true })}
                            onPress={submitDocuments}
                        />
                    </View>
                </ScrollView>
            </View>

        </SafeAreaView>
    )
}

export default Documents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F6F9'
    },
    topSection: {
        flex: 1,
        width: windowWidth - 20,
        alignSelf: 'center'
    },
    bottomSectionPage: {
        flex: 0.8,
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
        fontFamily: FONT.PlusJakartaSansBold,
        fontWeight: '700',
        fontSize: SIZES.extraLarge,
        color: COLORS.brand.primary,
        textAlign: 'center',
        letterSpacing: -0.4,
        lineHeight: 38,
    },
    pageSubtitle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'center',
        lineHeight: 18,
        color: COLORS.neutrals.thunder,
        marginTop: 24
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


    dropdown: {
        height: 45,
        borderWidth: 1,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.pearl,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 2,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.neutrals.thunder,
    },
    selectedTextStyle: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.black,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    documentUploadSection: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderStyle: 'dotted',
        borderRadius: 5,
        backgroundColor: COLORS.neutrals.coconut,
        borderColor: COLORS.neutrals.candy
    },
    documentUploadText: {
        fontSize: SIZES.font,
        color: COLORS.neutrals.thunder,
        fontFamily: FONT.PlusJakartaSansRegular,
    },
})
