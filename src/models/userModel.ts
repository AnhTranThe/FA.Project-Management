export interface IUserReducer {
  userReducer: {
    listUser: IUserListModel[] | [];
  };
}

export interface IUserListModel {
  Email: string;
  Name: string;
  Role: number;
}
