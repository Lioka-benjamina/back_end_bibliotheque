import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config =  new DocumentBuilder()

  .setTitle("projet bibliothèque")
  .setDescription("API du projet bibliotheque")
  .setVersion("1.0")
  .addBearerAuth()
  .addTag("Bibliotheque")
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("docs-api",app , document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
