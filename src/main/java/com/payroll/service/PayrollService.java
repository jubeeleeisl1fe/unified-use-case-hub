
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
        double netSalary = basicSalary - deductions;

        PayrollRecord payrollRecord = new PayrollRecord();
        payrollRecord.setEmployee(employee);
        payrollRecord.setBasicSalary(basicSalary);
        payrollRecord.setDeductions(deductions);
        payrollRecord.setNetSalary(netSalary);
        payrollRecord.setPaymentDate(LocalDate.now());

        return payrollRepository.save(payrollRecord);
    }

    public List<PayrollRecord> getPayrollHistory(String employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }
}
