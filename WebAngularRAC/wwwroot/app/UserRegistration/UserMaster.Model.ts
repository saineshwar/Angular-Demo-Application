import { IMyOptions, IMyDateModel } from 'mydatepicker';
export class UserMasterModel {
    constructor(
        public Username: string = "",
        public Password: string = "",
        public confirmPassword: string = "",
        public Address: string = "",
        public BirthdateView: IMyDateModel = null,
        public Birthdate: string = "",
        public Contact_No: string = "",
        public Email: string = ""
    ) {

    }
}