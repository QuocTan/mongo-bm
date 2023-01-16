import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ServerUnaryCall } from '@grpc/grpc-js';
import { MikroORM, UseRequestContext } from '@mikro-orm/core';

@Controller()
export class AppController {
  constructor(
    private readonly services: AppService,
    private readonly orm: MikroORM,
  ) {}
  private i = 0;
  private items = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ];

  @GrpcMethod('HeroesService', 'FindOne')
  @UseRequestContext()
  async findOne(
    data: { id: number },
    call: ServerUnaryCall<any, any>,
  ): Promise<{
    id: number;
    name: string;
  }> {
    this.i++;

    console.log(`Call ${data.id} ====> ${this.i}`);
    if (data.id == 1) {
      await this.services.cassandra();
    }

    if (data.id == 2) {
      await this.services.mongodb();
    }

    return this.items.find(({ id }) => id === data.id);
  }
}
