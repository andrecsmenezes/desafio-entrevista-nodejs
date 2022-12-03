export interface IAddressBase {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  zipCode: string;
  state: string;
  city: string;
  country: string;
}

export interface IAddress extends IAddressBase {
  id: number;
}

export type IAddressCreateRequest = IAddressBase;

export interface IAddressUpdateRequest extends IAddressBase {
  id: number;
}
