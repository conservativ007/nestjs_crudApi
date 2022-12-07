import { Injectable } from '@nestjs/common';
import { report } from 'process';
import { ReportType, data } from './data.js';

import { v4 as uuid } from 'uuid';

export interface Report {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    // return data.report.filter((report) => report.id === id);
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  }

  createReport(type: ReportType, dataReport: Report) {
    const newReport = {
      id: uuid(),
      ...dataReport,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };

    data.report.push(newReport);

    return newReport;
  }

  updateReport(id: string, body: Report) {
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

  deleteReport(id: string) {
    const findIndex = data.report.findIndex((report) => report.id === id);
    if (findIndex === -1) return false;

    data.report.splice(findIndex, 1);
    return true;
  }
}
