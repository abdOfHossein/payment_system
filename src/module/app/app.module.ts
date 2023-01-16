import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { SupportFeedbackModule } from '../support-feedback/support-feedback.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'mos_project',
        username: 'postgres',
        password: '774936188',
        entities: ['dist/**/*.entity.js', '**/*.entity.js'],
        migrations: ['dist/migrations/*{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    SupportFeedbackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
