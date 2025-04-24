
import { Employee, PayrollRecord, BonusRecord, LeaveRecord, TaxReport } from '../models/Employee';
import DatabaseService from '../services/DatabaseService';
import { TaxCalculator, BasicTaxStrategy, ProgressiveTaxStrategy } from '../utils/TaxCalculationStrategy';

class PayrollService {
  // Use case 1: Basic Payroll Calculation
  calculatePayroll(employee: Employee): PayrollRecord {
    const basicSalary = employee.salary;
    const deductions = basicSalary * 0.1; // 10% standard deduction

    // Use strategy pattern for tax calculation
    const taxCalculator = new TaxCalculator(); // Default to basic strategy
    const taxAmount = taxCalculator.calculateTax(basicSalary);

    // Option to switch strategies
    // taxCalculator.setStrategy(new ProgressiveTaxStrategy());
    
    const netSalary = basicSalary - deductions - taxAmount;

    const payrollRecord: PayrollRecord = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      basicSalary,
      deductions,
      taxAmount, // Add the tax amount to the record
      netSalary,
      paymentDate: new Date().toISOString(),
    };

    const existingRecords = DatabaseService.getData('payroll') || [];
    DatabaseService.saveData('payroll', [...existingRecords, payrollRecord]);

    return payrollRecord;
  }

  // Use case 2: Performance Bonus Calculation
  calculateBonus(employee: Employee, performanceScore: number): BonusRecord {
    const bonusPercentage = performanceScore >= 9 ? 0.2 : 
                           performanceScore >= 7 ? 0.15 :
                           performanceScore >= 5 ? 0.1 : 0.05;
    
    const bonusAmount = employee.salary * bonusPercentage;
    
    const bonusRecord: BonusRecord = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      performanceScore,
      bonusAmount,
      date: new Date().toISOString()
    };

    const existingBonuses = DatabaseService.getData('bonuses') || [];
    DatabaseService.saveData('bonuses', [...existingBonuses, bonusRecord]);

    return bonusRecord;
  }

  // Use case 3: Leave Management
  recordLeave(employee: Employee, startDate: string, endDate: string, type: string): LeaveRecord {
    const leaveRecord: LeaveRecord = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      startDate,
      endDate,
      type,
      status: 'pending'
    };

    const existingLeaves = DatabaseService.getData('leaves') || [];
    DatabaseService.saveData('leaves', [...existingLeaves, leaveRecord]);

    return leaveRecord;
  }

  // Use case 4: Tax Reporting
  generateTaxReport(employee: Employee, year: number): TaxReport {
    const payrollRecords = this.getPayrollHistory(employee.id);
    const totalEarnings = payrollRecords.reduce((sum, record) => sum + record.basicSalary, 0);
    const totalDeductions = payrollRecords.reduce((sum, record) => sum + record.deductions, 0);
    const totalTaxAmount = payrollRecords.reduce((sum, record) => sum + (record.taxAmount || 0), 0);
    
    const taxReport: TaxReport = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      year,
      totalEarnings,
      totalDeductions,
      taxableIncome: totalEarnings - totalDeductions,
      totalTaxAmount, // Store the total tax amount
      generatedDate: new Date().toISOString()
    };

    const existingReports = DatabaseService.getData('taxReports') || [];
    DatabaseService.saveData('taxReports', [...existingReports, taxReport]);

    return taxReport;
  }

  getPayrollHistory(employeeId: string): PayrollRecord[] {
    const records = DatabaseService.getData('payroll') || [];
    return records.filter((record: PayrollRecord) => record.employeeId === employeeId);
  }
}

export default new PayrollService();
