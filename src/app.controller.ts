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
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter((report) => report.type === reportType);
  }

  @Get(':id')
  getIncomReportById(@Param('type') type: string, @Param('id') id: string) {
    if (!['income', 'expense'].includes(type)) return {};
    return data.report.filter((report) => report.id === id);
  }

  @Post()
  createReport(
    @Param('type') type: string,
    @Body() { amount, source }: { amount: number; source: string },
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return newReport;
  }

  @Put(':id')
  putReport(
    @Param('id') id: string,
    @Body() body: { amount: number; source: string },
  ) {
    let newReport;

    data.report = data.report.map((report) => {
      if (report.id === id) {
        newReport = {
          ...report,
          ...body,
          updated_at: new Date(),
        };

        return newReport;
      }
      return report;
    });
    return newReport;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const findIndex = data.report.findIndex((report) => report.id === id);
    if (findIndex === -1) return false;

    data.report.splice(findIndex, 1);
    return true;
  }
}

/* http://localhost:3000/report/income */
// http://localhost:3000/ + controller decorator + method decorators
