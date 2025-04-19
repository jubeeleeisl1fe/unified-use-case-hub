
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
  netSalary: number;
  paymentDate: string;
}
