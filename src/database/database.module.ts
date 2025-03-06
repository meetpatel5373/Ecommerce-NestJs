import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { config } from 'src/config';
import { User } from 'src/entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products/product.entity';
import { Cart } from 'src/entities/carts/cart.entity';
import { Order } from 'src/entities/orders/order.entity';
import { OrderItems } from 'src/entities/order-items/order-item.entity';

const entities = TypeOrmModule.forFeature([
  User,
  Product,
  Cart,
  Order,
  OrderItems,
]);

@Global()
@Module({
  imports: [entities],
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
  exports: [entities, DataSource],
})
export class DatabaseModule {}
