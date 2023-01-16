import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusOrderEnum } from '../enum/order-status.enum';
import { SubscriptionEnt } from './subscription.entity';
import { UserEnt } from './user.entity';

@Entity({ name: 'order_record' })
export class OrderRecordEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: string;

  @Column({
    type: 'enum',
    enum: StatusOrderEnum,
    default: StatusOrderEnum.PENDING,
  })
  status: StatusOrderEnum;

  @Column()
  order_number: string;

  @OneToOne(() => SubscriptionEnt, (subscription) => subscription.order_record)
  @JoinColumn()
  subscription: SubscriptionEnt;

  @ManyToOne(() => UserEnt, (user) => user.order_record)
  user: UserEnt;
}
