import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from './config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './shared/guards/auth.guard';
import { UserModule } from './entities/users/user.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './entities/products/product.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { CartModule } from './entities/carts/cart.module';
import { OrderModule } from './entities/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: config().JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 86400,
    }),
    PassportModule,
    SharedModule,
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
