import {
  BaseModel,
  EntityRepository,
  InjectModel,
  Repository,
} from '@halonext/nestjs-express-cassandra';
import { types } from 'cassandra-driver';
import { WorkspaceEntity } from './workspace.entity';
import { ConfigService } from '@nestjs/config';
import { ulid } from 'ulid';

@EntityRepository(WorkspaceEntity)
export class WorkspacesRepository extends Repository<WorkspaceEntity> {
  constructor(
    @InjectModel(WorkspaceEntity)
    readonly model: BaseModel<WorkspaceEntity>,
    private readonly configs: ConfigService,
  ) {
    super();
  }

  async findById(workspaceId: string): Promise<WorkspaceEntity> {
    return this.findOne({ workspaceId }, { raw: false }).toPromise();
  }

  async createWorkspace(
    payload: Partial<WorkspaceEntity>,
  ): Promise<WorkspaceEntity> {
    const workspaceId = ulid();

    const instance = new this.model({
      ...payload,
      workspaceId,
    });

    await instance.saveAsync();

    return instance;
  }
}
