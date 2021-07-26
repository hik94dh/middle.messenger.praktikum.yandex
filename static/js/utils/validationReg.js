const checkEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
const checkPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
const checkLogin = /^([A-Za-zА-Яа-я0-9_\-.]){2,10}$/;
const checkText = /^([A-Za-zА-Яа-я]){2,10}$/;
const checkPass = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$/; // example Test1234!$
export const validation = {
    email: checkEmail,
    login: checkLogin,
    first_name: checkText,
    second_name: checkText,
    phone: checkPhone,
    password: checkPass,
    newPassword: checkPass,
    oldPassword: checkPass,
};
//# sourceMappingURL=validationReg.js.map