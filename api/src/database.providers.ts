import {DataSource, DataSourceOptions} from 'typeorm';
import {AppDataSource} from './database.source'

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = AppDataSource;
            return dataSource.initialize();
        },
    },
];
