import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './auth/user.entity';

const databaseOptions = () => {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User],
    subscribers: [],
    migrations: [],
    autoLoadEntities: true,
  } as TypeOrmModuleOptions;
};

export default databaseOptions;
