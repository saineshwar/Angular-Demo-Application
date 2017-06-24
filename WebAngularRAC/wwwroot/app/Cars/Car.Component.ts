import { Component, OnInit } from '@angular/core'
import { CarModel } from '../Cars/Car.Model'
import { CarService } from '../Cars/Services/Car.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'

@Component({
    templateUrl: 'app/Cars/Car.html',
    providers: [CarService]
})

export class CarComponent {
    carmodel: CarModel = new CarModel();
    submitted: boolean = false;
    status: boolean;
    private username: string = "";
    private data: any;
    emailPattern: string = '/^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/';

    constructor(private _carservice: CarService, private pService: NgProgressService, private _Route: Router)
    {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.username = this.data.username
    }

    onSubmit() {
        this.pService.start();
        var formdata = this.carmodel;
        formdata.Username = this.username;
        this._carservice.AddCar(formdata).subscribe(
            data => {
                if (data == true) {
                    alert("Your Data Saved Successfully ");
                    this._Route.navigate(['UploadCarPhoto']);
                }
                else {
                    alert("Problem While Adding Cars");
                }
            },
            error =>
            {
                if (error)
                {
                    alert("An Error has occured please try again after some time !");
                }
            });
        this.pService.done();
    }

    CheckModelNameExist()
    {
       

        var cars = this.carmodel;
        if (cars.Model_Name != null) {
            this._carservice.validateModelName(cars.Model_Name).subscribe
                (
                data => {
                    this.status = <boolean>data;

                    if (this.status == false) {
                        this.carmodel.Model_Name = "";
                        alert("ModelName Already Exits");
                    }
                    else {

                    }
                },
                error =>
                {
                    if (error)
                    {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }



}