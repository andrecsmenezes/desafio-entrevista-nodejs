import { DataSource } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { EstablishmentMovement } from './entities/establishmentMoviment.entity';

export const establishmentsProviders = [
  {
    provide: 'ESTABLISHMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Establishment),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'ESTABLISHMENT_MOVEMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstablishmentMovement),
    inject: ['DATA_SOURCE'],
  },
];
