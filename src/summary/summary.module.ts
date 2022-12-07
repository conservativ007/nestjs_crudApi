import { Module } from '@nestjs/common';
import { ReportModule } from 'src/report/report.module';
// import { ReportService } from 'src/report/report.service';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [ReportModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
