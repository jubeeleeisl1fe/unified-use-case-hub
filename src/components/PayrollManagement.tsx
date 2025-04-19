
import React, { useState, useEffect } from 'react';
import { Employee, PayrollRecord } from '../models/Employee';
import PayrollService from '../services/PayrollService';
import DatabaseService from '../services/DatabaseService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';

const PayrollManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});

  useEffect(() => {
    const savedEmployees = DatabaseService.getData('employees') || [];
    setEmployees(savedEmployees);
    const savedPayroll = DatabaseService.getData('payroll') || [];
    setPayrollRecords(savedPayroll);
  }, []);

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position || !newEmployee.salary) return;

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
  };

  const handleCalculatePayroll = (employee: Employee) => {
    const payrollRecord = PayrollService.calculatePayroll(employee);
    setPayrollRecords([...payrollRecords, payrollRecord]);
  };

  return (
    <div className="space-y-8">
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
        <div className="space-y-4">
          <Input
            placeholder="Name"
            value={newEmployee.name || ''}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <Input
            placeholder="Position"
            value={newEmployee.position || ''}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Salary"
            value={newEmployee.salary || ''}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })}
          />
          <Button onClick={handleAddEmployee}>Add Employee</Button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Employee List</h2>
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
      </div>

      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Payroll Records</h2>
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
      </div>
    </div>
  );
};

export default PayrollManagement;
