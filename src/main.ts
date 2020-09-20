import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const authority = 'common';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('SimpleApplicationService API')
    .setDescription('The SimpleApplicationService API description')
    .setVersion('v1')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        implicit: {
          scopes: { [`api://${clientId}/access_as_user`]: '' },
          authorizationUrl: `https://login.microsoftonline.com/${authority}/oauth2/v2.0/authorize`,
        },
      },
    })
    // .addTag('SimpleApplicationService')
    .build();
    
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  
  await app.listen(3000);
}
bootstrap();
