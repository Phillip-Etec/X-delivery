import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

import { LoggerMiddleware } from 'src/middlewares/request.logger'

@Module({
   imports: [PrismaModule, UsersModule],
   controllers: [AppController],
   providers: [AppService],
})

export class AppModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggerMiddleware).forRoutes('*')
   }
}
