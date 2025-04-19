
package com.payroll.repository;

import com.payroll.model.PayrollRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PayrollRepository extends JpaRepository<PayrollRecord, String> {
    List<PayrollRecord> findByEmployeeId(String employeeId);
}
