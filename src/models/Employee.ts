
export interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  joinDate: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  basicSalary: number;
  deductions: number;
  taxAmount: number; 
  netSalary: number;
  paymentDate: string;
}

export interface BonusRecord {
  id: string;
  employeeId: string;
  performanceScore: number;
  bonusAmount: number;
  date: string;
}

export interface LeaveRecord {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface TaxReport {
  id: string;
  employeeId: string;
  year: number;
  totalEarnings: number;
  totalDeductions: number;
  taxableIncome: number;
  totalTaxAmount: number; // Add total tax amount field
  generatedDate: string;
}
