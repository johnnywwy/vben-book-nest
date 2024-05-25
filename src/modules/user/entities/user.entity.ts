import { Entity, Column, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '用户名',
  })
  @Unique(['username'])
  username: string;

  @Column({
    // type: 'varchar',
    // length: 255,
    comment: '密码',
    // select: false, // 查询时不返回该字段
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '邮箱',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '角色',
    default: '',
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '昵称',
    nullable: true,
  })
  nickname: string;

  @Column({
    comment: '头像',
    nullable: true,
  })
  active: number;
}
