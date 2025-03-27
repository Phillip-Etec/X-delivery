import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

   const app = await NestFactory.create(AppModule);

   const docConfig = new DocumentBuilder()
      .setTitle('X-delivery API')
      .setDescription('API para o projeto X-delivery')
      .setVersion('0.0.1')
      .build()

   const document = SwaggerModule.createDocument(app, docConfig)

   SwaggerModule.setup('api', app, document)

   await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
