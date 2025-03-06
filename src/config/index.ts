export const config = (): EnvironmentVariables => ({
  APP_ENV: process.env.APP_ENV,
  APP_PORT: process.env.PORT,
  DB_PORT: parseInt(process.env.DB_PORT),
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_USERNAME: process.env.DB_USERNAME,
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  ALLOW_ORIGINS: process.env.ALLOW_ORIGINS,
  ALLOW_METHODS: process.env.ALLOW_METHODS,
  ALLOW_HEADERS: process.env.ALLOW_HEADERS,
  AWS_URL: process.env.AWS_URL,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_LOCATION: process.env.AWS_S3_LOCATION,
});

export interface EnvironmentVariables {
  APP_ENV: string;
  APP_PORT: string;
  DB_PORT: number;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  SWAGGER_PASSWORD: string;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  ALLOW_ORIGINS: string;
  ALLOW_METHODS: string;
  ALLOW_HEADERS: string;
  AWS_URL: string;
  AWS_S3_ACCESS_KEY: string;
  AWS_S3_SECRET_KEY: string;
  AWS_BUCKET_NAME: string;
  AWS_REGION: string;
  AWS_S3_LOCATION: string;
}
