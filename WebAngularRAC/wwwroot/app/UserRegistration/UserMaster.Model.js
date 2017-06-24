"use strict";
var UserMasterModel = (function () {
    function UserMasterModel(Username, password, confirmPassword, Address, BirthdateView, Birthdate, Contact_No, Email) {
        if (Username === void 0) { Username = ""; }
        if (password === void 0) { password = ""; }
        if (confirmPassword === void 0) { confirmPassword = ""; }
        if (Address === void 0) { Address = ""; }
        if (BirthdateView === void 0) { BirthdateView = null; }
        if (Birthdate === void 0) { Birthdate = ""; }
        if (Contact_No === void 0) { Contact_No = ""; }
        if (Email === void 0) { Email = ""; }
        this.Username = Username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.Address = Address;
        this.BirthdateView = BirthdateView;
        this.Birthdate = Birthdate;
        this.Contact_No = Contact_No;
        this.Email = Email;
    }
    return UserMasterModel;
}());
exports.UserMasterModel = UserMasterModel;
//# sourceMappingURL=UserMaster.Model.js.map