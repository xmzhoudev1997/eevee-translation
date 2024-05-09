import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class TRANSLATION_INFO {
  @PrimaryColumn()
  id: string;
  @Column()
  content: string;
  @Column()
  locale: string;
  @Column({ name: 'translation_content' })
  translationContent: string;


  @Column({ name: 'create_user' })
  createUser: string;
  @Column({ name: 'create_time' })
  crateTime: string;
  @Column({ name: 'update_user' })
  updateUser: string;
  @Column({ name: 'update_time' })
  updateTime: string;
  @Column()
  inuse: number;
}