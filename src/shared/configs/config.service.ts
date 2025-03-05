import { Injectable } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';
import { config } from '../../config';

@Injectable()
export class ConfigService {
  get typeOrmConfig() {
    const options: DataSourceOptions = {
      type: 'postgres',
      host: config().DB_HOST,
      port: config().DB_PORT,
      username: config().DB_USERNAME,
      password: config().DB_PASSWORD,
      database: config().DB_NAME,
      logging: false,
      entities: [__dirname + '/../../entities/**/*.entity{.ts,.js}'],
      synchronize: true,
    };

    return options;
  }
}
