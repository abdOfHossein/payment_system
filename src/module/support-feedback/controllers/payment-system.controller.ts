import { Body, Controller, Get, Post, Req, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { OrderRecordDto } from '../dto/order-record.dto';
import { PaymentSystemService } from '../services/payment-system.service';

@ApiTags('PaymentSystem')
@Controller('PaymentSystem')
export class PaymentSystemController {
  constructor(private readonly paymentSystemService: PaymentSystemService) {}

  @Post('test/createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.paymentSystemService.createUser(createUserDto);
  }

  @Get('/subscriptionInquiry')
  subscriptionInquiry(@Req() req: any) {
    const id_user = 'fb31fdfe-2d0d-4ba8-82c3-84b80c777e3e';
    return this.paymentSystemService.subscriptionInquiry(id_user);
  }

  @Post('/orderRecorde')
  orderRecorde(@Body() orderRecordDto: OrderRecordDto, @Req() req: any) {
    const id_user = 'fb31fdfe-2d0d-4ba8-82c3-84b80c777e3e';
    return this.paymentSystemService.orderRecorde(id_user, orderRecordDto);
  }

  @Get('/determineStatus')
  determineStatus(
    @Query('order_number') order_number: string,
    @Req() req: any,
  ) {
    const id_user = 'fb31fdfe-2d0d-4ba8-82c3-84b80c777e3e';
    return this.paymentSystemService.determineStatus(order_number, id_user);
  }
}
