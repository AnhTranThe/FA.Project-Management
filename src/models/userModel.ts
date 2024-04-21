export interface IUserReducer {
  userReducer: {
    listUser: IUserModel[] | [];
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
  role: number;
}
