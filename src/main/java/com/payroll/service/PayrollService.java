
package com.payroll.service;

import com.payroll.model.Employee;
import com.payroll.model.PayrollRecord;
import com.payroll.repository.EmployeeRepository;
import com.payroll.repository.PayrollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PayrollService {
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired
    private PayrollRepository payrollRepository;

    public PayrollRecord calculatePayroll(String employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
            .orElseThrow(() -> new RuntimeException("Employee not found"));

        double basicSalary = employee.getSalary();
        double deductions = basicSalary * 0.1; // 10% standard deduction
        double taxAmount = calculateTax(basicSalary);
        double netSalary = basicSalary - deductions - taxAmount;

        PayrollRecord payrollRecord = new PayrollRecord();
        payrollRecord.setEmployee(employee);
        payrollRecord.setBasicSalary(basicSalary);
        payrollRecord.setDeductions(deductions);
        payrollRecord.setTaxAmount(taxAmount);
        payrollRecord.setNetSalary(netSalary);
        payrollRecord.setPaymentDate(LocalDate.now());

        return payrollRepository.save(payrollRecord);
    }

    private double calculateTax(double salary) {
        // Progressive tax calculation
        if (salary <= 50000) {
            return salary * 0.1; // 10% tax
        } else if (salary <= 100000) {
            return salary * 0.2; // 20% tax
        } else {
            return salary * 0.3; // 30% tax
        }
    }

    public List<PayrollRecord> getPayrollHistory(String employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }
}
