import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { PageOptionsDto } from '../dto/page.option.dto';
import { SupportFeedbackFilterDto } from '../filter/support-feedback.filter.dto';

export class SupportFeedbackPageDto extends PageOptionsDto {
  @ApiProperty()
  @Allow()
  filter: SupportFeedbackFilterDto;
}
