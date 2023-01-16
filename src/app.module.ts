import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { loadConfiguration } from '@nestjs/cli/lib/utils/load-configuration';

@Module({
  imports: [
    StoreModule,
    ConfigModule.forRoot({
      load: [loadConfiguration],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
