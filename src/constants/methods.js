export const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validatePhoneNum = (inputtxt) => {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
        return true;
    } else {
        return false;
    }
};

export const validateGstNum = (inputtxt) => {
    var gstnum = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (inputtxt.match(gstnum)) {
        return true;
    } else {
        return false;
    }
};

export const validatePassword = (inputtxt) => {
    var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (inputtxt.match(password)) {
        return true;
    } else {
        return false;
    }
};

export const validatePanNum = (inputtxt) => {
    var pan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (inputtxt.match(pan)) {
        return true;
    } else {
        return false;
    }
};

export const validateMicrNum = (inputtxt) => {
    var micr_num = /^[0-9]{1,9}$/;
    if (inputtxt.match(micr_num)) {
        return true;
    } else {
        return false;
    }
};

export const validateIFSCNum = (inputtxt) => {
    var ifsc_num = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
    if (inputtxt.match(ifsc_num)) {
        return true;
    } else {
        return false;
    }
};


