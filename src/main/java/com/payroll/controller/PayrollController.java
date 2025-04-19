
package com.payroll.controller;

import com.payroll.model.Employee;
import com.payroll.model.PayrollRecord;
import com.payroll.repository.EmployeeRepository;
import com.payroll.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {
    @Autowired
    private PayrollService payrollService;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employees")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeRepository.save(employee));
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeRepository.findAll());
    }

    @PostMapping("/calculate/{employeeId}")
    public ResponseEntity<PayrollRecord> calculatePayroll(@PathVariable String employeeId) {
        return ResponseEntity.ok(payrollService.calculatePayroll(employeeId));
    }

    @GetMapping("/history/{employeeId}")
    public ResponseEntity<List<PayrollRecord>> getPayrollHistory(@PathVariable String employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollHistory(employeeId));
    }
}
