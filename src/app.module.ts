import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as pino from 'pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            stream: pino.transport({
              targets: [
                {
                  target: '@logtail/pino',
                  options: {
                    sourceToken: config.get<string>('LOGTAIL_SOURCE_TOKEN'),
                  },
                  level: 'info',
                },
                {
                  target: 'pino-pretty',
                  options: {
                    destination: 1,
                  },
                  level: 'debug',
                },
              ],
            }),
          },
        };
      },
    }),
    CommentsModule,
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
