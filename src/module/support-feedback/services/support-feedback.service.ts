import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SaveInfoFeedbackDto } from '../dto/save-info.dto';
import { SupportFeedbackEnt } from '../entity/support-feedback.entity';

@Injectable()
export class SupportFeedbackService {
  constructor(
    @InjectRepository(SupportFeedbackEnt)
    private dataSource: DataSource,
  ) {}

  async getAll() {
    try {
      const result = await this.dataSource.manager.find(SupportFeedbackEnt, {
        where: {},
      });
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async saveInfo(saveInfoFeedbackDto: SaveInfoFeedbackDto) {
    try {
      const feedbackEnt = new SupportFeedbackEnt();
      feedbackEnt.title = saveInfoFeedbackDto.title;
      feedbackEnt.content = saveInfoFeedbackDto.content;
      await this.dataSource.manager.save(feedbackEnt);
      return feedbackEnt;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
