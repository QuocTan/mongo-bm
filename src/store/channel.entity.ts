import { Entity, Index, PrimaryKey, Property, t } from '@mikro-orm/core';
import { ulid } from 'ulid';
import { ChannelRepository } from './channel.repository';

@Entity({
  schema: 'mongo-benchmark',
  tableName: 'channels',
  customRepository: () => ChannelRepository,
})
@Index({ properties: ['geocode', 'workspaceId', 'type'] })
export class ChannelEntity {
  @PrimaryKey({ type: 'string' })
  _id: string = ulid();

  @Property({
    type: 'string',
    onCreate: () => new Date().toISOString(),
  })
  createTime?: string;

  @Property({
    type: 'string',
    default: null,
    nullable: true,
    onUpdate: () => new Date().toISOString(),
  })
  updateTime?: string;

  @Property({
    type: 'string',
    default: null,
    nullable: true,
    onUpdate: () => new Date().toISOString(),
  })
  DeleteTime?: string;

  @Property()
  workspaceId!: string;

  @Property()
  geocode!: string;

  @Property()
  type!: string;

  /* DM Data */

  @Property({ nullable: true })
  recipientId!: string;

  /* Status receive message media */
  @Property({ nullable: true, default: null, type: t.json })
  dmSetting?: object;

  @Property({ nullable: true })
  dmStatus?: number;

  @Property({ nullable: true })
  name?: number;

  @Property({ nullable: true })
  avatar?: number;

  @Property({ nullable: true })
  AutoDeleteTime!: number;

  @Property({ nullable: true })
  LastMessage?: object;

  @Property({ nullable: true })
  dmId?: string;

  @Property({ nullable: true })
  AllowReceiveMedia?: object;

  @Property({ nullable: true })
  IsPrivate!: boolean;
}
