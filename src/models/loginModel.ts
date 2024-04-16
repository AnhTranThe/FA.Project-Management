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
