import 'reflect-metadata';
import { DataSource } from 'typeorm';

// if( ! process.env.TYPEORM_CONNECTION ) {
//     const dotenv = require('dotenv');
//     dotenv.config({path: __dirname + '/../.env'})
// }

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost', // process.env.TYPEORM_HOST,
  port: 3306, // parseInt(process.env.TYPEORM_PORT || '3306'),
  username: 'drconsulta', // process.env.TYPEORM_USERNAME,
  password: 'drconsulta', // process.env.TYPEORM_PASSWORD,
  database: 'drconsulta', // process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // (''+process.env.TYPEORM_SYNCHRONIZE).toLowerCase() === 'true',
  logging: true, // (''+process.env.TYPEORM_LOGGING).toLowerCase() === 'true',
  migrations: ['./database/**/*migrations.{ts|js}'],
  subscribers: [],
});
