import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('text')
  name: string;

  @Column('integer')
  age: number;

  @Column('text')
  breed: string;
}
