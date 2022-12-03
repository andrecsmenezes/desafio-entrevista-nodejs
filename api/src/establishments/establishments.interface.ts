import {Address} from "../common/entities/address.entity";
import {IAddress, IAddressCreateRequest} from "../common/interfaces/address.interface";
import {Establishment} from "./entities/establishment.entity";
import {Vehicle} from "../vehicles/entities/vehicle.entity";

export enum EstablishmentMovementType {
    ENTRANCE,
    EXIT,
}

export interface IEstablishmentBase {
    name: string,
    cnpj: string,
    phone: string,
    motorcycleVacancies: number,
    carVacancies: number,
}

export interface IEstablishment extends IEstablishmentBase{
    id?: number;
    address: Address;
}

export interface IEstablishmentCreateRequest extends IEstablishmentBase{
    address: IAddressCreateRequest;
}

export interface IEstablishmentUpdateRequest extends IEstablishmentBase{
    id: number;
    address: IAddress;
}

export interface IEstablishmentInsertCarRequest {
    board: string;
}

export interface IEstablishmentRemoveCarRequest {
    board: string;
}

export interface IEstablishmentMovementBase {
    establishment: Establishment;
    vehicle: Vehicle;
    movementType:EstablishmentMovementType;
    dateTime: Date;
}

export interface IEstablishmentMovement extends IEstablishmentMovementBase {}
