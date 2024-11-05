import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

// import { SentryModule } from '@sentry/nestjs/setup';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import configuration from './configs/configuration';
import { ArticlesModule } from './modules/articles/articles.module';
import { CommentsModule } from './modules/comments/comments.module';
import { HealthModule } from './modules/health/health.module';
import { LoggerModule } from './modules/logger/logger.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // SentryModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    LoggerModule,
    PostgresModule,
    ArticlesModule,
    UsersModule,
    CommentsModule,
    HealthModule,
    PostgresModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
