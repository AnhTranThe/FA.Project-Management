import { IUserModel } from "./userModel";

export interface ILoginReducer {
  loginReducer: {
    detailUser: IUserModel;
  };
}

export interface ILoginDetail {
  email: string;
  password: string;
}

export interface ISignUpModel {
  email: string;
  password: string;
  name: string;
  role: number;
}
export interface IForgotPasswordModel {
  email: string;
  pass: string;
  confirm: string;
}
export interface IDecodeAccessTokenModel {
  id: string;
  email: string;
  user_name: string;
  role: number;
}
