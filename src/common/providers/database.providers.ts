import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DATA_SOURCE } from '../constants';

async function createConnection(): Promise<DataSource> {
  const entitiesPath = path.resolve(
    __dirname,
    '..',
    '..',
    '**',
    '*.entity{.ts,.js}',
  );

  const dbConfig = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [entitiesPath],
    synchronize: true,
  } as DataSourceOptions;

  const dataSource = new DataSource(dbConfig);

  return dataSource.initialize();
}

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: (): Promise<DataSource> => {
      return createConnection();
    },
  },
];
