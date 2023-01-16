import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

export class SupportFeedbackFilterDto {
  @ApiProperty()
  @Allow()
  title: string;

  @ApiProperty()
  @Allow()
  content: string;
}
