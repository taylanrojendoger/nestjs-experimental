// NestJS
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Modules
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<string>('PORT') || 3000;
  const GLOBAL_PREFIX = configService.get<string>('GLOBAL_PREFIX');
  const URI_VERSION = configService.get<string>('URI_VERSION');
  const SWAGGER_TITLE = configService.get<string>('SWAGGER_TITLE');
  const SWAGGER_DESCRIPTION = configService.get<string>('SWAGGER_DESCRIPTION');
  const SWAGGER_VERSION = configService.get<string>('SWAGGER_VERSION');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: URI_VERSION
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addTag('books')
    //.addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(GLOBAL_PREFIX, app, document);

  await app.listen(PORT);
}

bootstrap();
