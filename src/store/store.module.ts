import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { ChannelEntity } from './channel.entity';
import {
  auth,
  ExpressCassandraModule,
} from '@halonext/nestjs-express-cassandra';
import { WorkspaceEntity } from './workspace.entity';
import { WorkspacesRepository } from './workspace.repository';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mongo',
      dbName: 'mongo-benchmark',
      clientUrl: 'mongodb://root:password123@103.155.164.239:27017',
      autoLoadEntities: true,
      forceEntityConstructor: true,
      forceUtcTimezone: true,
      ensureIndexes: true,
    }),
    MikroOrmModule.forFeature({
      entities: [ChannelEntity],
    }),
    ExpressCassandraModule.forRoot({
      clientOptions: {
        contactPoints: ['10.2.0.5'], //103.150.1.15// 172.16.62.141:9042
        localDataCenter: 'datacenter1',
        keyspace: 'core',
        queryOptions: { consistency: 1 },
        // authProvider: new auth.PlainTextAuthProvider('cassandra', 'cassandra'),
        pooling: {
          maxRequestsPerConnection: 100000,
        },
      },
      ormOptions: {
        createKeyspace: true,
        defaultReplicationStrategy: {
          class: 'SimpleStrategy',
          replication_factor: 1,
        },
      },
    }),
    ExpressCassandraModule.forFeature([WorkspaceEntity]),
  ],
  controllers: [],
  providers: [WorkspacesRepository],
  exports: [MikroOrmModule, WorkspacesRepository],
})
export class StoreModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getSchemaGenerator().ensureDatabase();
    await this.orm.getSchemaGenerator().updateSchema();

    await this.orm.getMigrator().up();
  }
}
