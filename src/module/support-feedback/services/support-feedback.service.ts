import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PageDto } from '../dto/page.dto';
import { PageMetaDto } from '../dto/page.meta.dto';
import { SaveInfoFeedbackDto } from '../dto/save-info.dto';
import { SupportFeedbackEnt } from '../entity/support-feedback.entity';
import { PublicFunc } from '../function/public.func';
import { SupportFeedbackPagination } from '../mapper/support-feedback.mapper.pagination';
import { SupportFeedbackPageDto } from '../pagination/support-feedback.page.dto';

@Injectable()
export class SupportFeedbackService {
  constructor(
    @InjectRepository(SupportFeedbackEnt)
    private dataSource: DataSource,
  ) {}

  async getAll(pageDto: SupportFeedbackPageDto) {
    try {
      const queryBuilder = this.dataSource.manager.createQueryBuilder(
        SupportFeedbackEnt,
        'support-feedback',
      );

      if (pageDto.base) {
        const row = pageDto.base.row;
        const skip = PublicFunc.skipRow(pageDto.base.page, pageDto.base.row);
        queryBuilder.skip(skip).take(row);
      }

      if (pageDto.filter) {
        if (pageDto.filter.title) {
          queryBuilder.andWhere('support_feedback.title LIKE :title', {
            title: `%${pageDto.filter.title}%`,
          });
        }
        if (pageDto.filter.content) {
          queryBuilder.andWhere('support_feedback.content LIKE :content', {
            content: `%${pageDto.filter.content}%`,
          });
        }
      }
      if (pageDto.field) {
        const mapper = SupportFeedbackPagination[pageDto.field];
        if (!mapper)
          throw new Error(
            `${JSON.stringify({
              section: 'public',
              value: 'Column Not Exist',
            })}`,
          );
        queryBuilder.addOrderBy(
          `${SupportFeedbackPagination[pageDto.field]}`,
          pageDto.base.order,
        );
      }
      const result = await queryBuilder.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        baseOptionsDto: pageDto.base,
        itemCount: result[1],
      });
      return new PageDto(result[0], pageMetaDto);
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
