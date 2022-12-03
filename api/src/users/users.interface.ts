export interface IUserBase {
    email: string,
    password: string,
}

export interface IUser extends IUserBase{
    id?: number,
}

export interface IUserCreateRequest extends IUserBase{}

export interface IUserUpdateRequest extends IUserBase{
    id: number
}
