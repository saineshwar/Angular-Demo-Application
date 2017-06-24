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
var PaymentAdmin_Service_1 = require("../Payment/Service/PaymentAdmin.Service");
var ng2_progressbar_1 = require("ng2-progressbar");
var AllPaymentDetailsAdminComponent = (function () {
    function AllPaymentDetailsAdminComponent(_paymentservice, pService) {
        this._paymentservice = _paymentservice;
        this.pService = pService;
    }
    AllPaymentDetailsAdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._paymentservice
            .GetAllPayedandCanceledPayment()
            .subscribe(function (data) { return _this.paymentviewmodel = data; }, function (error) { return console.log(error); });
    };
    return AllPaymentDetailsAdminComponent;
}());
AllPaymentDetailsAdminComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Payment/AllPaymentDetailsAdmin.html',
        providers: [PaymentAdmin_Service_1.PaymentAdminService]
    }),
    __metadata("design:paramtypes", [PaymentAdmin_Service_1.PaymentAdminService, ng2_progressbar_1.NgProgressService])
], AllPaymentDetailsAdminComponent);
exports.AllPaymentDetailsAdminComponent = AllPaymentDetailsAdminComponent;
//# sourceMappingURL=AllPaymentDetailsAdmin.Component.js.map