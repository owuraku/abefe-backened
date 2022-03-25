import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionsFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerDocumentOptions = new DocumentBuilder()
    .setTitle('Abefe Enterprise')
    .setDescription('Abefe Shop application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup('api', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new HttpExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
