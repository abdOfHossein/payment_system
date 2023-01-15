import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'support-feedback' })
export class SupportFeedbackEnt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: false })
  content: string;
}
