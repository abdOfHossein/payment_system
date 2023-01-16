import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { OrderRecordDto } from '../dto/order-record.dto';
import { OrderRecordEnt } from '../entity/order-record.entity';
import { SubscriptionEnt } from '../entity/subscription.entity';
import { UserEnt } from '../entity/user.entity';
import { StatusOrderEnum } from '../enum/order-status.enum';

@Injectable()
export class PaymentSystemService {
  constructor(
    @InjectRepository(OrderRecordEnt)
    @InjectRepository(UserEnt)
    @InjectRepository(SubscriptionEnt)
    private dataSource: DataSource,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = new UserEnt();
      user.mobile = createUserDto.mobile;
      user.nick_name = createUserDto.nick_name;
      await this.dataSource.manager.save(user);
      return user;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async subscriptionInquiry(id_user: string) {
    try {
      const subscription = await this.dataSource.manager
        .createQueryBuilder(UserEnt, 'user')
        .where('user.id = :id_user', { id_user })
        .leftJoinAndSelect('user.order_record', 'order_record')
        .leftJoinAndSelect('order_record.subscription', 'subscription')
        .getMany();
      for (const order_record of subscription[0].order_record) {
        if (order_record.status === StatusOrderEnum.SUCCESS) {
          const now = new Date(Date.now());
          const expired_date = order_record.subscription.expired_date;
          if (expired_date >= now) {
            const remain_date = new Date(
              expired_date.getTime() - now.getTime(),
            );
            order_record.subscription.remain_date = remain_date.getDate();
          }
        }
      }

      return subscription;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async orderRecorde(id_user: string, orderRecordDto: OrderRecordDto) {
    try {
      const user = await this.dataSource.manager.findOne(UserEnt, {
        where: { id: id_user },
      });

      const order_record = new OrderRecordEnt();
      order_record.order_number = String(Date.now());
      order_record.price = orderRecordDto.price;
      order_record.status = orderRecordDto.status;
      order_record.user = user;
      if (orderRecordDto.status === StatusOrderEnum.SUCCESS) {
        const subscription = new SubscriptionEnt();
        const now = new Date(Date.now());
        const expired_date = new Date(
          new Date(Date.now()).setDate(new Date(Date.now()).getDate() + 30),
        );
        subscription.expired_date = expired_date;
        await this.dataSource.manager.save(subscription);
        order_record.subscription = subscription;
      }
      await this.dataSource.manager.save(order_record);
      return order_record;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async determineStatus(order_number: string, id_user: string) {
    try {
      const orderRecord = await this.dataSource.manager
        .createQueryBuilder(UserEnt, 'user')
        .leftJoinAndSelect('user.order_record', 'order_record')
        .where(
          'order_record.order_number = :order_number AND user.id = :id_user',
          { order_number, id_user },
        )
        .select(['user.id', 'order_record.status'])
        .getOne();
      return orderRecord;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
