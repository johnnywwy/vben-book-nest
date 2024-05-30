import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '路径',
  })
  @Unique(['path']) // 唯一约束
  path: string;

  @Column({
    comment: '菜单名称',
  })
  @Unique(['name']) // 唯一约束
  name: string;

  @Column({
    comment: '菜单图片',
  })
  icon: string;

  @Column({
    comment: '重定向',
    nullable: true,
  })
  redirect: string;

  @Column({
    comment: '菜单配置',
  })
  meta: string;

  @Column({
    comment: '父级ID',
  })
  pid: number;

  @Column({
    comment: '是否启用',
    default: 1,
  })
  active: number;
}
