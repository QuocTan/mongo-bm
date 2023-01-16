import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as path from 'path';

async function bootstrap() {
    console.log(
        `PROTO LOCATION: ${path.resolve(__dirname, '../src/proto/hero.proto')}`,
    );
  const URL = 'localhost:50052';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: URL,
        package: 'hero',
        protoPath: path.resolve(__dirname, '../src/proto/hero.proto'),
      },
    },
  );

  await app.listen();
}
bootstrap().then(() => Logger.log(`started at port 50052`));
