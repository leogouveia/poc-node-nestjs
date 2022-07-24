import { DATA_SOURCE } from 'src/common/constants';
import { DataSource } from 'typeorm';
import { Cat } from './interfaces/cat.entity';

export const catProviders = [
  {
    provide: 'CAT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cat),
    inject: [DATA_SOURCE],
  },
];
