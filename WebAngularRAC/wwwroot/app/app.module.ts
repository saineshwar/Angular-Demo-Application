import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from "./app.Component";
import { MyDatePickerModule } from 'mydatepicker';
import { EqualValidator } from '../app/CustomDirectives/equal-validator.directive'
import { NgProgressModule } from 'ng2-progressbar';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { DxDataGridModule } from 'devextreme-angular';


//*--------------------------Custom Components-------------------------------*//

import { UserMasterComponent } from '../app/UserRegistration/UserMaster.Component'
import { UserDashboardComponent } from '../app/UserDashboard/UserDashboard.Component'
import { LoginComponent } from '../app/Login/Login.Component'
import { CarComponent } from '../app/Cars/Car.Component'
import { AddCarPhotoComponent } from '../app/Cars/AddCarsPhoto.Component'
import { AllCarsComponent } from '../app/Cars/AllCars.Component'
import { EditCarComponent } from '../app/Cars/EditCar.Component'
import { BookingComponent } from '../app/Booking/Booking.Component'
import { AllBookingDetails } from '../app/Booking/AllBookingDetails.Component'
import { DeleteBooking } from '../app/Booking/DeleteBooking.Component'
import { AdminDashboardComponent } from '../app/AdminDashboard/AdminDashboard.Component'
import { PaymentComponent } from '../app/Payment/Payment.Component'
import { AllPaymentDetails } from '../app/Payment/AllPaymentDetails.Component'
import { AuthGuard } from '../app/_guards/auth.guard'
import { AuthGuardAdmin } from '../app/_guards/auth.adminguard'
import { UserLogout } from '../app/Login/UserLogout.Component'
import { AdminLogout } from '../app/Login/AdminLogout.Component'
import { AdminBookingViewComponent } from '../app/Booking/AdminBookingView.Component'
import { PendingBookingComponent } from '../app/Booking/PendingBookingDetail.Component'
import { AllPaymentDetailsAdminComponent } from '../app/Payment/AllPaymentDetailsAdmin.Component'
import { CarFilterPipe } from '../app/CustomPipes/Carpipe'
import { ChangePasswordComponent } from '../app/Login/ChangePassword.Component'


export const galleryConfig = {
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
}

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, MyDatePickerModule, NgProgressModule, Ng2DatetimePickerModule, DxDataGridModule, 

        RouterModule.forRoot([
            {
                path: 'Login',
                component: LoginComponent
            },
            {
                path: 'ChangePassword',
                component: ChangePasswordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'UserLogout',
                component: UserLogout
            },
            {
                path: 'AdminLogout',
                component: AdminLogout
            },
            {
                path: 'UserRegistration',
                component: UserMasterComponent
            },
            {
                path: 'Car',
                component: CarComponent,
                canActivate: [AuthGuardAdmin]
            },
            {
                path: 'EditCar/:ID',
                component: EditCarComponent,
                canActivate: [AuthGuardAdmin]
            },
            {
                path: 'Payment/:ID',
                component: PaymentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'Payment',
                component: PaymentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'AllPaymentDetails',
                component: AllPaymentDetails,
                canActivate: [AuthGuard]
            },
            {
                path: 'AllCar',
                component: AllCarsComponent,
                canActivate: [AuthGuardAdmin]
            },
            {
                path: 'UploadCarPhoto',
                component: AddCarPhotoComponent,
                canActivate: [AuthGuardAdmin]
            },

            {
                path: 'UserDashboard',
                component: UserDashboardComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'Booking',
                component: BookingComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'AllBookingDetails',
                component: AllBookingDetails,
                canActivate: [AuthGuard]
            },
            {
                path: 'PendingBooking',
                component: PendingBookingComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'PaymentAdminView',
                component: AllPaymentDetailsAdminComponent,
                canActivate: [AuthGuardAdmin]
            },
            {
                path: 'DeleteBooking/:ID',
                component: DeleteBooking,
                canActivate: [AuthGuard]
            },
            {
                path: 'AdminBookingView',
                component: AdminBookingViewComponent,
                canActivate: [AuthGuardAdmin]
            },
            {
                path: 'Index',
                component: AppComponent
            },
            {
                path: 'AdminDashboard',
                component: AdminDashboardComponent,
                canActivate: [AuthGuardAdmin]
            },
            { path: '', redirectTo: '/Login', pathMatch: 'full' }
        ], { useHash: true })
    ],
    declarations: [AppComponent,
        UserMasterComponent,
        EqualValidator,
        LoginComponent,
        UserDashboardComponent,
        CarComponent,
        AddCarPhotoComponent,
        AllCarsComponent,
        EditCarComponent,
        BookingComponent,
        AllBookingDetails,
        DeleteBooking,
        AdminDashboardComponent,
        PaymentComponent,
        AllPaymentDetails,
        UserLogout,
        AdminLogout,
        AdminBookingViewComponent,
        PendingBookingComponent,
        AllPaymentDetailsAdminComponent,
        CarFilterPipe,
        ChangePasswordComponent
      
    ],
    bootstrap: [AppComponent],
    providers: [AuthGuard, AuthGuardAdmin]

})
export class AppModule { }