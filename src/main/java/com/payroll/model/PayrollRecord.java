
package com.payroll.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class PayrollRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private double basicSalary;
    private double deductions;
    private double taxAmount;
    private double netSalary;
    private LocalDate paymentDate;
}
