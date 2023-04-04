import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [userLoginStatus, setUserLoginStatus] = useState('')

    useEffect(() => {
        GetDataAfterMPinStatus()
    }, [])

    const GetDataAfterMPinStatus = async () => {
        setLoading(true)
        const userDataAfterMPin = await AsyncStorage.getItem("userDataAfterMPin");
        if (!userDataAfterMPin) {
            // Alert.alert("Unable to fetch mobile number, Login again");
            return;
        }
        const transformedMPinLoginData = JSON.parse(userDataAfterMPin);
        // console.log(transformedMPinLoginData);
        setLoading(false)
        setUserLoginStatus(transformedMPinLoginData.userStatus)
    }

    return (
        <AuthContext.Provider value={{
            isLoading,
            userLoginStatus,
            GetDataAfterMPinStatus,
        }}>
            {children}
        </AuthContext.Provider>
    )
}