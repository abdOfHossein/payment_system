import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { StatusOrderEnum } from '../enum/order-status.enum';

export class OrderRecordDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: string;

  @ApiProperty({ default: StatusOrderEnum.PENDING })
  status: StatusOrderEnum;

  @ApiHideProperty()
  order_number: string;
}
