export interface IUserReducer {
  userReducer: {
    listUser: IUserListModel[] | [];
  };
}

export interface IUserListModel {
  id?: number;
  email: string;
  password: string;
  name: string;
  role: number;
}
