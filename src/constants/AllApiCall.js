const BASE_URL = 'https://demo.crayoninfotech.com/newcagr/v2-api/';

export const OccupationApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/arroccupation", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const IncomeApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/allincometype", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const InvesterTypeApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/invtypes", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const TaxStatusApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/taxstatus", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetCountryList = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/countries", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetStateList = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/states/?country=99", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const AddressType = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/addrtypes", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetBankList = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/bankmaster", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetAccountType = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/accounttype", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const LoginApi = async (email, password) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
        myHeaders.append("Cookie", "name=2; PHPSESSID=2d71a775e58727ddcdf2eca0c955f708");

        var formdata = new FormData();
        formdata.append("username", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "auth/login", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const MPinApi = async (user_id, isMPin) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
        myHeaders.append("Cookie", "name=2; PHPSESSID=2d71a775e58727ddcdf2eca0c955f708");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("mpin", isMPin);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/verifympin", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export const CreateAccountApi = async (email) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        const response = await fetch(BASE_URL + "register/sendEmailOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export const ResendOtpApi = async (email) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("email", email);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/resendEmailOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const VerifyEmailOTPApi = async (user_id, otp) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("otp", otp);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/verifyOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const SetAppPasswordApi = async (user_id, isPassword, isReenterPassword) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("password", isPassword);
        formdata.append("c_password", isReenterPassword);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/setpassword", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const MobileNumberApi = async (user_id, mobileNumber) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("mobile", mobileNumber);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/sendMobileOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const ResendMobileOtpApi = async (user_id, user_mobile_no) => {
    try {
        // console.log('data--->', email, password);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("mobile", user_mobile_no);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/resendMobileOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const MobileNumberVerifyApi = async (user_id, isOTP) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("otp", isOTP);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/verifyOTP", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const VerifyPanApi = async (user_id, panNumber) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("pan", panNumber);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/verifypan", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const setMpinPasswordApi = async (user_id, isMpin) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("mpin", isMpin);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "register/setmpin", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};

export const GetRelationsListApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/relations", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
};


export const AddressProofType = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/addressprooftype", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetUserDataApi = async (userid) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("cust_id", userid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "profile/userdetail", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const AMCMasterApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(BASE_URL + "common/amcmaster", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}


export const SchemeMasterApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(BASE_URL + "common/schtype", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const FundDivOptionsApi = async () => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const response = await fetch(BASE_URL + "common/funddivoption", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetAllInvestFundListApi = async (userId) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("fundhouse", "");
        formdata.append("schemetype", "");
        formdata.append("fundgrowth", "");
        formdata.append("fundoption", "");
        formdata.append("fundsrt", "");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "invest/invest", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetAllInvestFundListFilterApi = async (user_id) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);
        formdata.append("fundhouse", '');
        formdata.append("schemetype", "");
        formdata.append("fundgrowth", "");
        formdata.append("fundoption", "");
        formdata.append("fundsrt", "");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "invest/invest", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetInvestFundDetails = async (idFund) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("fundid", idFund);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/fundetailsbyid", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetFolioNumberList = async (userid, AmcCode) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", userid);
        formdata.append("amc_code", AmcCode);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "common/getFolioData", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetBankDetails = async (userid) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("cust_id", userid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "profile/userbankdetail", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const GetAllNomineeList = async (userid) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");
        myHeaders.append("Cookie", "ses_cagr_f=fbc60ea35e7a026f878e98982a041a80");

        var formdata = new FormData();
        formdata.append("cust_id", userid);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "profile/usernominee", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}

export const TransactionOtpApi = async (user_id) => {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic YWRtaW46MTIzNA==");

        var formdata = new FormData();
        formdata.append("user_id", user_id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        const response = await fetch(BASE_URL + "invest/validate_otp_details", requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}








