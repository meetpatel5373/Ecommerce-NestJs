import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
import { MultiUpload } from './upload/multiple-upload';
import { AppAbilityFactory } from './ability/ability.factory';
import { AwsService } from './aws-upload/aws.service';
import { HelperService } from './services/common.service';
import { ValidationService } from './services/validation.service';
import { RedisService } from './redis/redis.service';

@Global()
@Module({
  imports: [],
  providers: [
    AppAbilityFactory,
    MultiUpload,

    ConfigService,

    HelperService,
    ValidationService,

    AwsService,
    RedisService,
  ],
  exports: [
    AppAbilityFactory,
    ConfigService,
    MultiUpload,
    HelperService,
    ValidationService,
    AwsService,
    RedisService,
  ],
  controllers: [],
})
export class SharedModule {}
