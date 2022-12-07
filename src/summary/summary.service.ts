import { Injectable } from '@nestjs/common';
import { ReportService } from 'src/report/report.service';
import { data, ReportType } from '../data';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  getSummary() {
    let allExpense = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((acc, val) => acc + val.amount, 0);

    let allIncome = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((acc, val) => acc + val.amount, 0);

    // another way to get a summary of our income / expense
    // let income = 0;
    // let expense = 0;

    // data.report.forEach((val) => {
    //   if (val.type === 'income') income += val.amount;
    //   if (val.type === 'expense') expense += val.amount;
    // });

    return {
      income: allIncome,
      expense: allExpense,
      summary: allIncome - allExpense,
    };
  }
}
