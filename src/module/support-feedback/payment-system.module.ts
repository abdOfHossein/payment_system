import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentSystemController } from './controllers/payment-system.controller';
import { OrderRecordEnt } from './entity/order-record.entity';
import { SubscriptionEnt } from './entity/subscription.entity';
import { UserEnt } from './entity/user.entity';
import { PaymentSystemService } from './services/payment-system.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRecordEnt,SubscriptionEnt,UserEnt])],
  controllers: [PaymentSystemController],
  providers: [PaymentSystemService],
})
export class PaymentSystemModule {}
