import {Establishment} from "../establishments/entities/establishment.entity";

export enum VehicleType {
    MOTORCYCLE,
    CAR,
}

export enum CarType {
    CONVERTIBLE,
    SILK,
    HATCH,
    COUPE,
    SW,
    SUV,
    PICKUP,
    MINIVAN,
    VAN,
    BUGGY,
}

export enum CarBrand {
    VOLKSWAGEN,
    CHEVROLET,
    FIAT,
    HYUNDAI,
    TOYOTA,
    JEEP,
    CAOA,
    CHERY,
    RENAULT,
    NISSAN,
    HONDA,
    PEUGEOT,
    FORD,
    CITROEN,
    MITSUBISHI,
    AUDI,
    BWM,
    VOLVO,
    MERCEDESBENZ,
    JAC,
    MOTORS,
    KIA,
    LANDROVER,
    SUZUKI,
    RAM,
    PORSCHE,
    MINI,
    FERRARI,
    LAMBORGHINI,
    TESLA,
    JAGUAR,
    LEXUS,
    MASERATI,
    MCLAREN,
    SUBARU,
}

export enum MotorcycleType {
    BIGTRAIL,
    CUSTOM,
    SPORTIVE,
    NAKED,
    SCOOTER,
    STREET,
    TOURING,
    TRAIL,
    OFFROAD,
}

export enum MotorcycleBrand {
    AVELLOZ,
    BMW,
    DAFRA,
    DUCATI,
    HAOJUE,
    HARLEYDAVIDSON,
    HONDA,
    KAWASAKI,
    KTM,
    KYMCO,
    MXF,
    PIAGGIO,
    PROTORKMINI,
    ROYALENFIELD,
    SHINERAY,
    SOUSA,
    SUZUKI,
    TRIUMPH,
    VOLTZ,
    YAMAHA,
}

export interface IVehicleBase {
    brand: CarBrand | MotorcycleBrand,
    model: string,
    color: string,
    board: string,
    type: CarType | MotorcycleType,
    vehicleType: VehicleType,
}

export interface IVehicle extends IVehicleBase{
    id: number,
    establishment: Establishment | null
}

export interface IVehicleCreateRequest extends IVehicleBase{}

