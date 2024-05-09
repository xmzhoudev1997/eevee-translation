import { Entity, Column, PrimaryColumn } from 'typeorm';

export enum LOG_TYPE {
  新增 = '0100',
  修改 = '0200',
  删除 = '0300',
  修改内容 = '0201',
}

@Entity()
export class LOG_INFO {
  @PrimaryColumn()
  id: string;
  @Column({ name: 'termbase_id' })
  termbaseId: string;
  @Column()
  type: LOG_TYPE;
  @Column({ name: 'old_content' })
  oldContent: string;
  @Column({ name: 'new_content' })
  newContent: string;


  @Column({ name: 'create_user' })
  createUser: string;
  @Column({ name: 'create_time' })
  crateTime: string;
}