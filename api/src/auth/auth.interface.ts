export interface IAuthBase {
  email: string;
}

export interface IAuth extends IAuthBase {
  id: number;
  token: string;
}

export interface IAuthSignInRequest extends IAuthBase {
  password: string;
}
