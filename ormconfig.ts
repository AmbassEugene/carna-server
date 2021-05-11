// import {}
import { ConnectionOptions } from 'typeorm';
export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'carna',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
} as ConnectionOptions;
