import { Injectable } from '@nestjs/common';
import { report } from 'process';
import { ReportType, data } from '../data.js';

import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from '../dtos/report.dto.js';

export interface Report {
  amount: number;
  source: string;
}

export interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    // return data.report.filter((report) => report.id === id);
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(type: ReportType, dataReport: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      ...dataReport,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return new ReportResponseDto(newReport);
  }

  updateReport(id: string, body: UpdateReport): ReportResponseDto {
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
    return new ReportResponseDto(newReport);
  }

  deleteReport(id: string) {
    const findIndex = data.report.findIndex((report) => report.id === id);
    if (findIndex === -1) return false;

    data.report.splice(findIndex, 1);
    return true;
  }
}
