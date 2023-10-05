import * as YAML from 'yaml'
import { readFileSync } from 'fs';
import * as swaggerUI from 'swagger-ui-express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  // TO-DO: Move to dedicated module
  const swaggerDocs = YAML.parse(readFileSync('documentation/api.yaml', 'utf-8'));
  const httpAdapter = app.getHttpAdapter();
  // @ts-ignore
  httpAdapter.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

  await app.listen(8080);
}

bootstrap();
