import React, { useState, useEffect } from 'react';
import { Employee, PayrollRecord, BonusRecord, LeaveRecord, TaxReport } from '../models/Employee';
import PayrollService from '../services/PayrollService';
import DatabaseService from '../services/DatabaseService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from "@/hooks/use-toast";
import {
  BadgeDollarSign,
  BadgePercent,
  CalendarDays,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const PayrollManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [bonusRecords, setBonusRecords] = useState<BonusRecord[]>([]);
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [taxReports, setTaxReports] = useState<TaxReport[]>([]);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
  const [performanceScore, setPerformanceScore] = useState<number>(0);
  const [leaveStartDate, setLeaveStartDate] = useState<string>('');
  const [leaveEndDate, setLeaveEndDate] = useState<string>('');
  const [leaveType, setLeaveType] = useState<string>('');

  useEffect(() => {
    const savedEmployees = DatabaseService.getData('employees') || [];
    const savedPayroll = DatabaseService.getData('payroll') || [];
    const savedBonuses = DatabaseService.getData('bonuses') || [];
    const savedLeaves = DatabaseService.getData('leaves') || [];
    const savedTaxReports = DatabaseService.getData('taxReports') || [];
    
    setEmployees(savedEmployees);
    setPayrollRecords(savedPayroll);
    setBonusRecords(savedBonuses);
    setLeaveRecords(savedLeaves);
    setTaxReports(savedTaxReports);
  }, []);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.salary) {
      toast({
        title: "Error",
        description: "Please fill in all employee details",
        variant: "destructive",
      });
      return;
    }

    const employee: Employee = {
      id: crypto.randomUUID(),
      name: newEmployee.name,
      position: newEmployee.position,
      salary: Number(newEmployee.salary),
      joinDate: new Date().toISOString(),
    };

    const updatedEmployees = [...employees, employee];
    DatabaseService.saveData('employees', updatedEmployees);
    setEmployees(updatedEmployees);
    setNewEmployee({});
    toast({
      title: "Success",
      description: "Employee added successfully",
    });
  };

  const handleCalculatePayroll = (employee: Employee) => {
    const payrollRecord = PayrollService.calculatePayroll(employee);
    setPayrollRecords([...payrollRecords, payrollRecord]);
    toast({
      title: "Success",
      description: "Payroll calculated successfully",
    });
  };

  const handleCalculateBonus = (employee: Employee) => {
    if (performanceScore < 0 || performanceScore > 10) {
      toast({
        title: "Error",
        description: "Performance score must be between 0 and 10",
        variant: "destructive",
      });
      return;
    }
    const bonusRecord = PayrollService.calculateBonus(employee, performanceScore);
    setBonusRecords([...bonusRecords, bonusRecord]);
    toast({
      title: "Success",
      description: "Bonus calculated successfully",
    });
  };

  const handleRecordLeave = (employee: Employee) => {
    if (!leaveStartDate || !leaveEndDate || !leaveType) {
      toast({
        title: "Error",
        description: "Please fill in all leave details",
        variant: "destructive",
      });
      return;
    }
    const leaveRecord = PayrollService.recordLeave(employee, leaveStartDate, leaveEndDate, leaveType);
    setLeaveRecords([...leaveRecords, leaveRecord]);
    setLeaveStartDate('');
    setLeaveEndDate('');
    setLeaveType('');
    toast({
      title: "Success",
      description: "Leave request recorded successfully",
    });
  };

  const handleGenerateTaxReport = (employee: Employee) => {
    const currentYear = new Date().getFullYear();
    const taxReport = PayrollService.generateTaxReport(employee, currentYear);
    setTaxReports([...taxReports, taxReport]);
    toast({
      title: "Success",
      description: "Tax report generated successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl shadow-lg">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary-foreground">
              Employee Payroll Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Name"
                className="col-span-1"
                value={newEmployee.name || ''}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
              <Input
                placeholder="Position"
                className="col-span-1"
                value={newEmployee.position || ''}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Salary"
                className="col-span-1"
                value={newEmployee.salary || ''}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })}
              />
            </div>
            <Button 
              onClick={handleAddEmployee} 
              className="w-full mt-4 bg-primary hover:bg-primary/90 transition-colors"
            >
              Add Employee
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <Tabs defaultValue="payroll" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 rounded-none">
            <TabsTrigger 
              value="payroll" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BadgeDollarSign className="h-4 w-4" />
              Payroll
            </TabsTrigger>
            <TabsTrigger 
              value="bonus" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BadgePercent className="h-4 w-4" />
              Bonus
            </TabsTrigger>
            <TabsTrigger 
              value="leave" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <CalendarDays className="h-4 w-4" />
              Leave
            </TabsTrigger>
            <TabsTrigger 
              value="tax" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileText className="h-4 w-4" />
              Tax
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payroll" className="p-6">
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Employee Payroll</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>${employee.salary}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleCalculatePayroll(employee)}>
                              Calculate Payroll
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Payroll Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Basic Salary</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Salary</TableHead>
                        <TableHead>Payment Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.employeeId}</TableCell>
                          <TableCell>${record.basicSalary}</TableCell>
                          <TableCell>${record.deductions}</TableCell>
                          <TableCell>${record.netSalary}</TableCell>
                          <TableCell>{new Date(record.paymentDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bonus" className="p-6">
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Employee Bonus</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Performance Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="0"
                              max="10"
                              placeholder="Score (0-10)"
                              value={performanceScore}
                              onChange={(e) => setPerformanceScore(Number(e.target.value))}
                            />
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleCalculateBonus(employee)}>
                              Calculate Bonus
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Bonus Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Performance Score</TableHead>
                        <TableHead>Bonus Amount</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bonusRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.employeeId}</TableCell>
                          <TableCell>{record.performanceScore}</TableCell>
                          <TableCell>${record.bonusAmount}</TableCell>
                          <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leave" className="p-6">
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Leave Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Leave Details</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            <div className="space-y-2">
                              <Input
                                type="date"
                                placeholder="Start Date"
                                value={leaveStartDate}
                                onChange={(e) => setLeaveStartDate(e.target.value)}
                              />
                              <Input
                                type="date"
                                placeholder="End Date"
                                value={leaveEndDate}
                                onChange={(e) => setLeaveEndDate(e.target.value)}
                              />
                              <Input
                                placeholder="Leave Type"
                                value={leaveType}
                                onChange={(e) => setLeaveType(e.target.value)}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button onClick={() => handleRecordLeave(employee)}>
                              Record Leave
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Leave Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.employeeId}</TableCell>
                          <TableCell>{new Date(record.startDate).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(record.endDate).toLocaleDateString()}</TableCell>
                          <TableCell>{record.type}</TableCell>
                          <TableCell>{record.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tax" className="p-6">
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Tax Reporting</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            <Button onClick={() => handleGenerateTaxReport(employee)}>
                              Generate Tax Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Tax Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee ID</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>Total Earnings</TableHead>
                        <TableHead>Total Deductions</TableHead>
                        <TableHead>Taxable Income</TableHead>
                        <TableHead>Generated Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {taxReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>{report.employeeId}</TableCell>
                          <TableCell>{report.year}</TableCell>
                          <TableCell>${report.totalEarnings}</TableCell>
                          <TableCell>${report.totalDeductions}</TableCell>
                          <TableCell>${report.taxableIncome}</TableCell>
                          <TableCell>{new Date(report.generatedDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PayrollManagement;
