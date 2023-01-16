import { Column, Entity } from '@halonext/nestjs-express-cassandra';
import { ulid } from 'ulid';

@Entity<WorkspaceEntity>({
  table_name: 'benchmark',
  key: ['workspaceId'],
})
export class WorkspaceEntity {
  @Column({ type: 'varchar' })
  workspaceId: string = ulid();

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'varchar' })
  avatar: string;
}
