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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: config().JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
    PassportModule,
    SharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
