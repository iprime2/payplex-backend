import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  logo!: string;

  @Column()
  mailId!: string;

  @Column()
  contact!: string;

  @Column()
  bannerImage!: string;

  @Column()
  header!: string;

  @Column('text')
  text!: string;

  @Column()
  address!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
