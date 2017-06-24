import { Component } from '@angular/core';
import { LoginModel } from '../Login/Login.Model';
import { LoginService } from '../Login/Services/Login.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'

@Component({
    templateUrl: 'app/Login/Login.html',
    styleUrls: ['../../css/Login.css'],
    providers: [LoginService]
})

export class LoginComponent {
    constructor(private pService: NgProgressService, private _Route: Router, private _LoginService: LoginService) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('AdminUser');
    }

    LoginModel: LoginModel = new LoginModel();
    webresponse: any;
    status: boolean;

    onSubmit() {
        this.pService.start();

        var loginmodel = this.LoginModel;

        this._LoginService.validateLoginUser(this.LoginModel).subscribe
            (
            data => {
                this.webresponse = data;

                if (this.webresponse.UserTypeID == "0") {
                    alert("Invalid Username and Password");
                    this._Route.navigate(['Login']);
                }
                else {
                    if (this.webresponse.UserTypeID == "2") {
                        alert("Logged in Successfully");
                        this._Route.navigate(['UserDashboard']);
                    }
                    else {
                        alert("Logged in Successfully");
                        this._Route.navigate(['AdminDashboard']);
                    }
                }
            },
            err => {
                if (err)
                {
                    alert("An Error has occured please try again after some time !");
                }
            });


        this.pService.done();
    }


}
