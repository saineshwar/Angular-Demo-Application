"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_Component_1 = require("./app.Component");
var mydatepicker_1 = require("mydatepicker");
var equal_validator_directive_1 = require("../app/CustomDirectives/equal-validator.directive");
var ng2_progressbar_1 = require("ng2-progressbar");
var ng2_datetime_picker_1 = require("ng2-datetime-picker");
var devextreme_angular_1 = require("devextreme-angular");
//*--------------------------Custom Components-------------------------------*//
var UserMaster_Component_1 = require("../app/UserRegistration/UserMaster.Component");
var UserDashboard_Component_1 = require("../app/UserDashboard/UserDashboard.Component");
var Login_Component_1 = require("../app/Login/Login.Component");
var Car_Component_1 = require("../app/Cars/Car.Component");
var AddCarsPhoto_Component_1 = require("../app/Cars/AddCarsPhoto.Component");
var AllCars_Component_1 = require("../app/Cars/AllCars.Component");
var EditCar_Component_1 = require("../app/Cars/EditCar.Component");
var Booking_Component_1 = require("../app/Booking/Booking.Component");
var AllBookingDetails_Component_1 = require("../app/Booking/AllBookingDetails.Component");
var DeleteBooking_Component_1 = require("../app/Booking/DeleteBooking.Component");
var AdminDashboard_Component_1 = require("../app/AdminDashboard/AdminDashboard.Component");
var Payment_Component_1 = require("../app/Payment/Payment.Component");
var AllPaymentDetails_Component_1 = require("../app/Payment/AllPaymentDetails.Component");
var auth_guard_1 = require("../app/_guards/auth.guard");
var auth_adminguard_1 = require("../app/_guards/auth.adminguard");
var UserLogout_Component_1 = require("../app/Login/UserLogout.Component");
var AdminLogout_Component_1 = require("../app/Login/AdminLogout.Component");
var AdminBookingView_Component_1 = require("../app/Booking/AdminBookingView.Component");
var PendingBookingDetail_Component_1 = require("../app/Booking/PendingBookingDetail.Component");
var AllPaymentDetailsAdmin_Component_1 = require("../app/Payment/AllPaymentDetailsAdmin.Component");
var Carpipe_1 = require("../app/CustomPipes/Carpipe");
var ChangePassword_Component_1 = require("../app/Login/ChangePassword.Component");
var carousel_component_1 = require("./CarGallery/carousel.component");
exports.galleryConfig = {
    "style": {
        "background": "#121519",
        "width": "900px",
        "height": "600px"
    },
    "animation": "fade",
    "loader": {
        "width": "50px",
        "height": "50px",
        "position": "center",
        "icon": "oval"
    },
    "description": {
        "position": "bottom",
        "overlay": false,
        "text": true,
        "counter": true
    },
    "bullets": false,
    "player": {
        "autoplay": false,
        "speed": 3000
    },
    "thumbnails": {
        "width": 120,
        "height": 90,
        "position": "top",
        "space": 20
    },
    "navigation": true
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, mydatepicker_1.MyDatePickerModule, ng2_progressbar_1.NgProgressModule, ng2_datetime_picker_1.Ng2DatetimePickerModule, devextreme_angular_1.DxDataGridModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'Login',
                    component: Login_Component_1.LoginComponent
                },
                {
                    path: 'ChangePassword',
                    component: ChangePassword_Component_1.ChangePasswordComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'UserLogout',
                    component: UserLogout_Component_1.UserLogout
                },
                {
                    path: 'AdminLogout',
                    component: AdminLogout_Component_1.AdminLogout
                },
                {
                    path: 'UserRegistration',
                    component: UserMaster_Component_1.UserMasterComponent
                },
                {
                    path: 'Car',
                    component: Car_Component_1.CarComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'EditCar/:ID',
                    component: EditCar_Component_1.EditCarComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'Payment/:ID',
                    component: Payment_Component_1.PaymentComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'Payment',
                    component: Payment_Component_1.PaymentComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'AllPaymentDetails',
                    component: AllPaymentDetails_Component_1.AllPaymentDetails,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'AllCar',
                    component: AllCars_Component_1.AllCarsComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'UploadCarPhoto',
                    component: AddCarsPhoto_Component_1.AddCarPhotoComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'UserDashboard',
                    component: UserDashboard_Component_1.UserDashboardComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'Booking',
                    component: Booking_Component_1.BookingComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'AllBookingDetails',
                    component: AllBookingDetails_Component_1.AllBookingDetails,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'PendingBooking',
                    component: PendingBookingDetail_Component_1.PendingBookingComponent,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'PaymentAdminView',
                    component: AllPaymentDetailsAdmin_Component_1.AllPaymentDetailsAdminComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'DeleteBooking/:ID',
                    component: DeleteBooking_Component_1.DeleteBooking,
                    canActivate: [auth_guard_1.AuthGuard]
                },
                {
                    path: 'AdminBookingView',
                    component: AdminBookingView_Component_1.AdminBookingViewComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                {
                    path: 'Index',
                    component: app_Component_1.AppComponent
                },
                {
                    path: 'AdminDashboard',
                    component: AdminDashboard_Component_1.AdminDashboardComponent,
                    canActivate: [auth_adminguard_1.AuthGuardAdmin]
                },
                { path: '', redirectTo: '/Login', pathMatch: 'full' }
            ], { useHash: true })
        ],
        declarations: [app_Component_1.AppComponent,
            UserMaster_Component_1.UserMasterComponent,
            equal_validator_directive_1.EqualValidator,
            Login_Component_1.LoginComponent,
            UserDashboard_Component_1.UserDashboardComponent,
            Car_Component_1.CarComponent,
            AddCarsPhoto_Component_1.AddCarPhotoComponent,
            AllCars_Component_1.AllCarsComponent,
            EditCar_Component_1.EditCarComponent,
            Booking_Component_1.BookingComponent,
            AllBookingDetails_Component_1.AllBookingDetails,
            DeleteBooking_Component_1.DeleteBooking,
            AdminDashboard_Component_1.AdminDashboardComponent,
            Payment_Component_1.PaymentComponent,
            AllPaymentDetails_Component_1.AllPaymentDetails,
            UserLogout_Component_1.UserLogout,
            AdminLogout_Component_1.AdminLogout,
            AdminBookingView_Component_1.AdminBookingViewComponent,
            PendingBookingDetail_Component_1.PendingBookingComponent,
            AllPaymentDetailsAdmin_Component_1.AllPaymentDetailsAdminComponent,
            Carpipe_1.CarFilterPipe,
            ChangePassword_Component_1.ChangePasswordComponent,
            carousel_component_1.CSSCarouselComponent
        ],
        bootstrap: [app_Component_1.AppComponent],
        providers: [auth_guard_1.AuthGuard, auth_adminguard_1.AuthGuardAdmin]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map