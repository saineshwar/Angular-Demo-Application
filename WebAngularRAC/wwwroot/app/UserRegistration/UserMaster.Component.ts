import { Component, animate } from '@angular/core'
import { UserMasterModel } from '../UserRegistration/UserMaster.Model'
import { UserRegistrationService } from '../UserRegistration/Services/UserRegistration.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'
import { CSSCarouselComponent } from '../CarGallery/carousel.component';

@Component({
    templateUrl: 'app/UserRegistration/UserRegistration.html',
    providers: [UserRegistrationService]
    
    
})

export class UserMasterComponent {
    

    constructor(private pService: NgProgressService, private _Route: Router, private _UserRegistrationService: UserRegistrationService) {


    }

    UserMasterModel: UserMasterModel = new UserMasterModel();
    responseStatus: Object = [];
    status: boolean;

    onSubmit() {

        this.pService.start();
        var formdata = this.UserMasterModel;
        var UserBirthdate = this.UserMasterModel.BirthdateView.date;

        var SelectedBirthdate = UserBirthdate.year + "-" + UserBirthdate.month + "-" + UserBirthdate.day;
        formdata.Username = this.UserMasterModel.Username;
        formdata.Password = this.UserMasterModel.Password;
        formdata.Address = this.UserMasterModel.Address;
        formdata.Birthdate = SelectedBirthdate;
        formdata.Contact_No = this.UserMasterModel.Contact_No;
        formdata.Email = this.UserMasterModel.Email;

        this._UserRegistrationService.createUser(formdata).subscribe
            (
            data => {

                if (data == true) {
                    alert("Your Registration has done Successfully ");
                    this._Route.navigate(['Login']);
                }
                else {
                    alert("Problem While Registering User");
                }
            },
            err => {
                if (err) {
                    alert("An Error has occured please try again after some time !");
                }
            });

        this.pService.done();
    }


    CheckUsernameExist()
    {
        var registration = this.UserMasterModel;
        if (registration.Username != null)
        {
            this._UserRegistrationService.validateUsername(registration.Username).subscribe
                (
                data => {
                    this.status = <boolean>data;

                    if (this.status == false) {
                        this.UserMasterModel.Username = "";
                        alert("Username Already Exits");
                    }
                    else {

                    }
                },
                err => {
                    if (err) {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }



}