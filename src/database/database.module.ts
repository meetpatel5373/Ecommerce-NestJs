import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { config } from 'src/config';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            host: config().DB_HOST,
            port: config().DB_PORT,
            username: config().DB_USERNAME,
            password: config().DB_PASSWORD,
            database: config().DB_NAME,
            synchronize: true,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });

          return await dataSource.initialize();
        } catch (error) {
          console.log('Error connecting to database');
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}
