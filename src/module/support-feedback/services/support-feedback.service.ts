import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SupportFeedbackService {
  constructor(private dataSource: DataSource) {}

  async getAll() {
    try {
        const result=await this.dataSource.find()
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
