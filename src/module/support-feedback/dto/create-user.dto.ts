import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  mobile: string;

  @ApiProperty()
  nick_name: string;
}
