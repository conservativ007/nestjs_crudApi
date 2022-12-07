import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { Data, data, ReportType } from './data';

import { AppService, Report } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getIncomReportById(@Param('type') type: string, @Param('id') id: string) {
    // if (!['income', 'expense'].includes(type)) return {};
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type') type: ReportType,
    @Body() { amount, source }: Report,
  ) {
    return this.appService.createReport(type, { amount, source });
  }

  @Put(':id')
  putReport(@Param('id') id: string, @Body() body: Report) {
    return this.appService.updateReport(id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    return this.appService.deleteReport(id);
  }
}

/* http://localhost:3000/report/income */
// http://localhost:3000/ + controller decorator + method decorators
