"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Car_Model_1 = require("../Cars/Car.Model");
var Car_Service_1 = require("../Cars/Services/Car.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var AddCarPhotoComponent = (function () {
    function AddCarPhotoComponent(http, _carservice, pService, _Route) {
        this.http = http;
        this._carservice = _carservice;
        this.pService = pService;
        this._Route = _Route;
        this.carmodel = new Car_Model_1.CarModel();
        this.token = "";
        this.username = "";
        this.actionUrl = 'http://localhost:56483/AddCarsPhoto/UploadFiles';
        this.data = JSON.parse(localStorage.getItem('AdminUser'));
        this.token = this.data.token;
        this.username = this.data.username;
    }
    AddCarPhotoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._carservice
            .GetAllCarsDetails()
            .subscribe(function (data) { return _this.CarData = data; }, function (error) {
            if (error) {
                alert("An Error has occured please try again after some time !");
            }
        });
    };
    AddCarPhotoComponent.prototype.fileChange = function (event) {
        var fileList = event.target.files;
        this.fileList = fileList;
    };
    AddCarPhotoComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.fileList == null) {
            alert("FileUpload Required");
            return false;
        }
        else if (this.selectedCar == null) {
            alert("Model Name Required");
            return false;
        }
        else {
            var fileList = this.fileList;
            if (fileList.length > 0) {
                var file = fileList[0];
                var formData = new FormData();
                formData.append('uploadFile', file, file.name);
                formData.append('SelectedCarID', this.selectedCar);
                var headers = new http_1.Headers();
                headers.append('Token', "" + this.token);
                var options = new http_1.RequestOptions({ headers: headers });
                this.http.post("" + this.actionUrl, formData, options)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    if (data == true) {
                        alert("Photo Uploaded Successfully ");
                        _this._Route.navigate(['AllCar']);
                    }
                    else {
                        alert("Photo is Already Uploaded Successfully");
                    }
                }, function (error) {
                    if (error) {
                        alert("An Error has occured please try again after some time !");
                    }
                });
            }
        }
    };
    return AddCarPhotoComponent;
}());
AddCarPhotoComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Cars/AddCarsPhoto.html',
        providers: [Car_Service_1.CarService]
    }),
    __metadata("design:paramtypes", [http_1.Http, Car_Service_1.CarService, ng2_progressbar_1.NgProgressService, router_1.Router])
], AddCarPhotoComponent);
exports.AddCarPhotoComponent = AddCarPhotoComponent;
//# sourceMappingURL=AddCarsPhoto.Component.js.map