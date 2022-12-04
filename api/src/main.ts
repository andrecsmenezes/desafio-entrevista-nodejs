import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });

  const config = new DocumentBuilder()
    .setTitle('Dr. Consulta')
    .setDescription('API for Dr. Consulta')
    .setVersion('1.0')
    .addTag('test')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
