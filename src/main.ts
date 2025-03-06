import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import basicAuth from 'express-basic-auth';
import { config as configBase } from './config';
import { config } from 'dotenv';
import { setupSwagger } from './swagger';
import { useContainer } from 'class-validator';
import fs from 'fs';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  app.useGlobalPipes(new ValidationPipe());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const whitelist = configBase().ALLOW_ORIGINS?.split(',');
  const methods = configBase().ALLOW_METHODS?.split(',');
  const headers = configBase().ALLOW_HEADERS?.split(',');

  app.enableCors({
    allowedHeaders: headers,
    methods: methods,
    preflightContinue: false,
    credentials: true,
    origin: whitelist,
  });

  app.setGlobalPrefix('api/v1');
  app.use(
    '/documentation',
    basicAuth({
      users: { admin: configBase().SWAGGER_PASSWORD },
      challenge: true,
    }),
  );

  await setupSwagger(app);
  await app.listen(Number(configBase().APP_PORT), () => {
    fs.readFile('./server-startup.txt', 'utf8', (err, data) => {
      console.log(data);
      console.log('LISTENING ON PORT : ' + Number(configBase().APP_PORT));
    });
  });
}
bootstrap();
