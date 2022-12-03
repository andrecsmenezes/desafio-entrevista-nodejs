export interface IUserBase {
  email: string;
  password: string;
}

export interface IUser extends IUserBase {
  id?: number;
}

export type IUserCreateRequest = IUserBase;

export interface IUserUpdateRequest extends IUserBase {
  id: number;
}
