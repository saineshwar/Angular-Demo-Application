import { Component , OnInit } from '@angular/core'
import { CarModel } from '../Cars/Car.Model'
import { CarService } from '../Cars/Services/Car.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'

@Component({
    templateUrl: 'app/Cars/AllCars.html',
    providers: [CarService]
})

export class AllCarsComponent implements OnInit
{
    CarData: CarModel[];

    constructor(private pService: NgProgressService,private _carservice: CarService)
    {
      
    }

    ngOnInit(): void
    {
        this.pService.start();
        this._carservice
            .GetAllCarsDetails()
            .subscribe(data => {
                this.CarData = data
                this.pService.done();
            },
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
       
    }


}