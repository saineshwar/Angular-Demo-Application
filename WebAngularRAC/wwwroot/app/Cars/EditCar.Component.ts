import { Component, OnInit } from '@angular/core'
import { CarModel } from '../Cars/Car.Model'
import { CarService } from '../Cars/Services/Car.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router, ActivatedRoute } from '@angular/router'
@Component({
    templateUrl: 'app/Cars/EditCar.html',
    providers: [CarService]
})

export class EditCarComponent implements OnInit {
    carmodel: CarModel = new CarModel();
    ID: string;
    private username: string = "";
    private data: any;
    constructor(private pService: NgProgressService, private _Route: Router, private _carservice: CarService, private _routeParams: ActivatedRoute) {
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.username = this.data.username
    }

    ngOnInit(): void
    {
        this.ID = this._routeParams.snapshot.params['ID'];
        if (this.ID != null) {
            this._carservice.EditCar(this.ID)
                .subscribe(data =>
                {
                    this.carmodel = <CarModel>data;
                },
                error => {
                    if (error) {
                        alert("An Error has occured please try again after some time !");
                    }
                });
        }
    }

    onSubmit() {
        
        var formdata = this.carmodel;
        formdata.Username = this.username;
        this._carservice.UpdateCar(formdata).subscribe(
            data => {
                if (data == true)
                {
                    alert("Your Data Update Successfully ");
                    this._Route.navigate(['AllCar']);
                }
                else {
                    alert("Problem While Adding Cars");
                }
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
        
    }
}