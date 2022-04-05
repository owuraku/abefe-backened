import { StockModule } from './stock/stock.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { HttpExceptionsFilter } from './common/filters/http-exception.filter';
import { ENV_FILE_VALIDATOR } from './common/validators/env.validator';
import appConfig from './config/app.config';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    StockModule,
    ConfigModule.forRoot({
      validationSchema: ENV_FILE_VALIDATOR,
      load: [appConfig],
      ignoreEnvFile:
        process.env.IGNORE_ENV && process.env.IGNORE_ENV.includes('true'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      port: +process.env.DATABASE_PORT,
      autoLoadEntities: true,
      synchronize: true,
      ssl:
        process.env.ENV === 'development'
          ? undefined
          : {
              rejectUnauthorized: false,
            },
      cache: {
        duration: 60000, // 1 minute
      },
    }),
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
