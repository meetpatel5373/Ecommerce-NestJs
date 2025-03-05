import { Injectable } from '@nestjs/common';
import { config } from '../../config';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HelperService } from '../services/common.service';

@Injectable()
export class AwsService {
  constructor(private readonly helperService: HelperService) {}
  AWS_S3_BUCKET = config().AWS_BUCKET_NAME;
  AWS_S3_ACCESS_KEY = config().AWS_S3_ACCESS_KEY;
  AWS_S3_SECRET_KEY = config().AWS_S3_SECRET_KEY;
  AWS_REGION = config().AWS_REGION;
  AWS_S3_LOCATION = config().AWS_S3_LOCATION;

  s3Client = new S3Client({
    credentials: {
      accessKeyId: this.AWS_S3_ACCESS_KEY,
      secretAccessKey: this.AWS_S3_SECRET_KEY,
    },
    region: this.AWS_REGION,
  });

  uploadFile = async (
    file: Express.Multer.File,
    path: string,
  ): Promise<string> => {
    const randomName = await this.helperService.generateRandomString(10);

    return await this.awsUploadFile(
      file.buffer,
      this.AWS_S3_BUCKET,
      randomName,
      file.mimetype,
      this.AWS_S3_LOCATION + path,
    );
  };

  awsUploadFile = async (
    file: Buffer,
    bucket: string,
    name: string,
    mimeType: string,
    path: string,
  ): Promise<string> => {
    const timestamp = new Date().getTime();

    const fileName = path + name + timestamp + '.' + mimeType.split('/')[1];

    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: file,
      ContentType: mimeType,
      ContentEncoding: mimeType,
    };

    await this.s3Client.send(new PutObjectCommand(params));

    return fileName;
  };

  getSignedUrl = async (key: string): Promise<string> => {
    const command = new GetObjectCommand({
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
    });

    return await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 60 * 24 * 7,
    });
  };

  awsDeleteFile = async (key: string): Promise<boolean> => {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: key,
    };

    await this.s3Client.send(new DeleteObjectCommand(params));

    return true;
  };
}
