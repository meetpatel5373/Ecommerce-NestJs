import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { UserEmailValidation } from 'src/shared/validate/users/user-email-validation';
import { CorrectUserPasswordValidation } from 'src/shared/validate/users/correct-user-password-validation';
import { UserIdValidation } from 'src/shared/validate/users/user-id-validation';
import { PasswordMatchValidation } from 'src/shared/validate/passwords';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SharedModule],
  providers: [
    UserService,

    UserEmailValidation,
    PasswordMatchValidation,
    CorrectUserPasswordValidation,
    UserIdValidation,
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
