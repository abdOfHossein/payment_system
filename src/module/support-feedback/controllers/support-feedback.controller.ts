import { Controller, Get } from '@nestjs/common';
import { SupportFeedbackService } from '../services/support-feedback.service';

@Controller()
export class SupportFeedbackController {
  constructor(
    private readonly supportFeedbackService: SupportFeedbackService,
  ) {}

  @Get()
   getAll(){
    return this.supportFeedbackService.getAll() 
  }
}
