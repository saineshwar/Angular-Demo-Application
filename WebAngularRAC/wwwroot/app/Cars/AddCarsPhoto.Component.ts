import { Component, OnInit } from '@angular/core'
import { CarModel } from '../Cars/Car.Model'
import { CarService } from '../Cars/Services/Car.Service'
import { NgProgressService } from "ng2-progressbar";
import { Router } from '@angular/router'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Component({
    templateUrl: 'app/Cars/AddCarsPhoto.html',
    providers: [CarService]
})

export class AddCarPhotoComponent implements OnInit {
    carmodel: CarModel = new CarModel();
    private actionUrl: string;
    selectedCar: string;
    CarData: CarModel[];
    private token: string = "";
    private username: string = "";
    private data: any;

    private fileList: FileList;
    constructor(private http: Http, private _carservice: CarService, private pService: NgProgressService, private _Route: Router)
    {
        this.actionUrl = 'http://localhost:56483/AddCarsPhoto/UploadFiles';

        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username
    }

    ngOnInit() {
        this._carservice
            .GetAllCarsDetails()
            .subscribe(data => this.CarData = data,
            error => {
                if (error) {
                    alert("An Error has occured please try again after some time !");
                }
            });
    }

    fileChange(event: any) {
        let fileList: FileList = event.target.files;
        this.fileList = fileList;
    }

    onSubmit() {
        if (this.fileList == null) {
            alert("FileUpload Required");
            return false;
        }
        else if (this.selectedCar == null) {
            alert("Model Name Required");
            return false;
        }
        else {

            let fileList: FileList = this.fileList;
            if (fileList.length > 0)
            {
                let file: File = fileList[0];
                let formData: FormData = new FormData();
                formData.append('uploadFile', file, file.name);
                formData.append('SelectedCarID', this.selectedCar);
                let headers = new Headers();
                headers.append('Token', `${this.token}`);
                let options = new RequestOptions({ headers: headers });
                this.http.post(`${this.actionUrl}`, formData, options)
                    .map(res => res.json())
                    .subscribe
                    (
                    data => {
                        if (data == true)
                        {
                            alert("Photo Uploaded Successfully ");
                            this._Route.navigate(['AllCar']);
                        }
                        else
                        {
                            alert("Photo is Already Uploaded Successfully");
                        }
                    },
                    error =>
                    {
                        if (error)
                        {
                            alert("An Error has occured please try again after some time !");
                        }
                    })
            }
        }
    }
}