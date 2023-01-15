import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportFeedbackController } from './controllers/support-feedback.controller';
import { SupportFeedbackEnt } from './entity/support-feedback.entity';
import { SupportFeedbackService } from './services/support-feedback.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupportFeedbackEnt])],
  controllers: [SupportFeedbackController],
  providers: [SupportFeedbackService],
})
export class SupportFeedbackModule {}
