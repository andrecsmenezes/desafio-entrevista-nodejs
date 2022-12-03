import {BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateEvent} from "typeorm";
import {CarBrand, CarType, IVehicle, MotorcycleBrand, MotorcycleType, VehicleType} from "../vehicles.interface";
import {ApiProperty} from "@nestjs/swagger";
import {Establishment} from "../../establishments/entities/establishment.entity";
import {EstablishmentMovement} from "../../establishments/entities/establishmentMoviment.entity";

@Entity("vehicles")
export class Vehicle implements IVehicle{
    @ApiProperty()

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    board: string;

    @Column()
    brand: CarBrand | MotorcycleBrand;

    @Column()
    color: string;

    @Column()
    model: string;

    @Column()
    type: CarType | MotorcycleType;

    @Column()
    vehicleType: VehicleType;

    @ManyToOne(() => Establishment, establishment => establishment.vehicles, {nullable: true})
    establishment: Establishment | null;

    @OneToMany(
        () => EstablishmentMovement,
        establishmentMovement => establishmentMovement.vehicle
    )
    movement: EstablishmentMovement;
}
