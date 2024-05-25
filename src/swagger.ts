import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestApplication } from '@nestjs/core';

export function setupSwagger(app: NestApplication) {
  const options = new DocumentBuilder()
    .setTitle('imooc项目')
    .setDescription('超级无敌牛逼的nestjs项目')
    .setVersion('1.0')
    // .addTag('啦啦啦')
    .setExternalDoc('ApiFox', 'http://localhost:3005/api/doc-json')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);
}
