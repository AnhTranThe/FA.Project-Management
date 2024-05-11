export interface IUserReducer {
  userReducer: {
    listUser: IUserModel[] | [];
    listDetailUser: IUserModel[] | [];
  };
}

export interface IUserModel {
  email: string;
  name: string;
  role: number;
  password: string;
  id?: string;
}
export interface IUserLogInInfoModel {
  id: string;
  email: string;
  user_name: string;
  role: number;
}
