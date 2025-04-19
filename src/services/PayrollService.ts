
import { Employee, PayrollRecord } from '../models/Employee';
import DatabaseService from '../services/DatabaseService';

class PayrollService {
  calculatePayroll(employee: Employee): PayrollRecord {
    const basicSalary = employee.salary;
    const deductions = basicSalary * 0.1; // 10% standard deduction
    const netSalary = basicSalary - deductions;

    const payrollRecord: PayrollRecord = {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      basicSalary,
      deductions,
      netSalary,
      paymentDate: new Date().toISOString(),
    };

    // Store in database
    const existingRecords = DatabaseService.getData('payroll') || [];
    DatabaseService.saveData('payroll', [...existingRecords, payrollRecord]);

    return payrollRecord;
  }

  getPayrollHistory(employeeId: string): PayrollRecord[] {
    const records = DatabaseService.getData('payroll') || [];
    return records.filter((record: PayrollRecord) => record.employeeId === employeeId);
  }
}

export default new PayrollService();
