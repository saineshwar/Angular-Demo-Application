import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ChangePasswordModel } from '../Login/ChangePassword.Model'
import { ChangePasswordService } from '../Login/Services/Changepassword.Service'
@Component({
    templateUrl: 'app/Login/ChangePassword.html',
    providers: [ChangePasswordService]

})
export class ChangePasswordComponent {
    constructor(private _service: ChangePasswordService, private _Route: Router) {

    }

    changepasswordmodel: ChangePasswordModel = new ChangePasswordModel;
    response: boolean;
    onSubmit() {

        var formdata = this.changepasswordmodel;

        if (formdata.OldPassword == "") {
            return alert("OldPassword Required");
        }
        else if (formdata.NewPassword == "") {
            return alert("NewPassword Required");
        }
        else if (formdata.ConfirmPassword == "") {
            return alert("ConfirmPassword Required");
        }
        else {
            this._service.ChangeUserPassword(this.changepasswordmodel).
                subscribe(
                data =>
                {
                    this.response = <boolean>data;

                    if (this.response)
                    {
                        alert("Your Password has been changed Successfully");
                        this._Route.navigate(['UserDashboard']);
                    }
                    else {
                        alert("An Error has occured please try again after some time !");
                        this._Route.navigate(['UserDashboard']);
                    }

                },
                err =>
                {
                    if (err)
                    {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }

    }

}