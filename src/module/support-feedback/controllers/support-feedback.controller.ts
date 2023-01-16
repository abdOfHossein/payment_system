import { Controller, Get, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SaveInfoFeedbackDto } from '../dto/save-info.dto';
import { SupportFeedbackPageDto } from '../pagination/support-feedback.page.dto';
import { SupportFeedbackService } from '../services/support-feedback.service';

@ApiTags('SupportFeedback')
@Controller('SupportFeedback')
export class SupportFeedbackController {
  constructor(
    private readonly supportFeedbackService: SupportFeedbackService,
  ) {}

  @Post('/getAll/page')
  getAll(@Body() supportFeedbackPageDto:SupportFeedbackPageDto) {
    return this.supportFeedbackService.getAll(supportFeedbackPageDto);
  }

  @Post('saveInfo')
  saveInfo(@Body() saveInfoFeedbackDto: SaveInfoFeedbackDto) {
    return this.supportFeedbackService.saveInfo(saveInfoFeedbackDto);
  }
}
