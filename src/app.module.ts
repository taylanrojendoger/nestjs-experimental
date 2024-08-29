// NestJS
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

// DTOs & Entities
import { Author } from '@/authors/author.entity';
import { AuthorsModule } from '@/authors/authors.module';
import { Book } from '@/books/book.entity';
import { BooksModule } from '@/books/books.module';

// Guards
import { AuthGuard } from '@/common/guards/auth.guard';
import { RolesGuard } from '@/common/guards/roles.guard';

// Interceptors
import { TimeoutInterceptor } from '@/common/interceptors/timeout.interceptor';
// import { HttpCacheInterceptor } from '@/common/interceptors/http-cache.interceptor';

// Middleware
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env.development'],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Author, Book],
        synchronize: true // remove in production
      })
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('THROTTLE_TTL'),
          limit: configService.get<number>('THROTTLE_LIMIT')
        }
      ]
    }),
    AuthorsModule,
    BooksModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor
    },
    /* 
      {
        provide: APP_INTERCEPTOR,
        useClass: HttpCacheInterceptor
      }
    */
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
