import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderRecordEnt } from './order-record.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  expired_date: Date;

  @Column({ nullable: true })
  remain_date: number;

  @OneToOne(() => OrderRecordEnt, (order_record) => order_record.subscription)
  order_record: OrderRecordEnt;
}
