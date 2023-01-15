import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator/types/decorator/decorators';

export class SaveInfoFeedbackDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;
}
