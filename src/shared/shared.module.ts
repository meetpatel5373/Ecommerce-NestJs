import { Global, Module } from '@nestjs/common';
import { ConfigService } from './configs/config.service';
import { MultiUpload } from './upload/multiple-upload';
import { AppAbilityFactory } from './ability/ability.factory';
import { AwsService } from './aws-upload/aws.service';
import { HelperService } from './services/common.service';
import { ValidationService } from './services/validation.service';

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
  ],
  exports: [
    AppAbilityFactory,
    ConfigService,
    MultiUpload,
    HelperService,
    ValidationService,
    AwsService,
  ],
  controllers: [],
})
export class SharedModule {}
