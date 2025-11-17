import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger } from '@nestjs/common'
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

   const app = await NestFactory.create(AppModule);

   const swaggerPath: string = 'api'
   const port: string | number = process.env.API_PORT ?? 3000

   const docConfig = new DocumentBuilder()
      .setTitle('X-delivery API')
      .setDescription('API para o projeto X-delivery')
      .setVersion('0.0.1')
      .build()

   const document = SwaggerModule.createDocument(app, docConfig)

   SwaggerModule.setup(swaggerPath, app, document)

   await app.listen(port);

   NestLogger.log(`[Bootstrap] Application is running on http://localhost:${port}`)
   NestLogger.log(`[Swagger] Swagger documentation can be found on http://localhost:${port}/${swaggerPath}`)
}

bootstrap();
