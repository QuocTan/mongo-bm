import { Injectable } from '@nestjs/common';
import { ChannelRepository } from './store/channel.repository';
import { WorkspacesRepository } from './store/workspace.repository';
import { WorkspaceEntity } from './store/workspace.entity';
import { ulid } from 'ulid';

@Injectable()
export class AppService {
  constructor(
    private readonly channels: ChannelRepository,
    private readonly workspaces: WorkspacesRepository,
  ) {}

  async cassandra(): Promise<WorkspaceEntity> {
    return this.workspaces.createWorkspace({
      workspaceId: ulid(),
      avatar: 'avatar',
      owner: 'owner',
      name: 'name',
    });
  }

  async mongodb(): Promise<any> {
    return this.channels.insert();
  }

  async findById(id: string): Promise<any> {
    return this.channels.findById(id);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
