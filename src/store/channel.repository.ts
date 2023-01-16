import { EntityRepository } from '@mikro-orm/mongodb';
import { Logger } from '@nestjs/common';
import { ChannelEntity } from './channel.entity';

export class ChannelRepository extends EntityRepository<ChannelEntity> {
  private readonly logger = new Logger(ChannelRepository.name);

  async insert(): Promise<ChannelEntity | Error> {
    const instance = this.create({
      geocode: 'vn',
      workspaceId: '0',
      type: 'def',
      AutoDeleteTime: 0,
      IsPrivate: false,
      createTime: '',
      recipientId: 'random',
    });

    await this.persistAndFlush(instance);

    return instance;
  }

  async findById(channelId: string): Promise<ChannelEntity | Error> {
    const channel = await this.findOne({ _id: channelId });

    if (!channel) {
      return new Error('Could not get channel');
    }

    return channel;
  }
}
