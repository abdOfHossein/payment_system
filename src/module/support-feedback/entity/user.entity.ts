import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderRecordEnt } from './order-record.entity';

@Entity({ name: 'user' })
export class UserEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mobile: string;

  @Column()
  nick_name: string;

  @OneToMany(()=>OrderRecordEnt,(order_record)=>order_record.user)
  order_record:OrderRecordEnt[]
}
