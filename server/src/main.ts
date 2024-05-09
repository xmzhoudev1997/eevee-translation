import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app/module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CustomExceptionFilter } from './exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
  .setTitle('Eevee Translatin API')
  .setDescription('完整API说明')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalFilters(new CustomExceptionFilter());
  const port = process.env.PORT || 8000;
  await app.listen(port);

  const microApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(process.env.MICRO_PORT),
        host: process.env.MICRO_HOST,
      }
    },
  );
  microApp.useGlobalFilters(new CustomExceptionFilter());
  microApp.listen();
}

bootstrap();
