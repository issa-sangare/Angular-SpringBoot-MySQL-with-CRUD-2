package com.project1.backend.service;
import com.project1.backend.model.Employee;

import java.util.List;

public interface EmployeeService {

    Employee create(Employee employee);

    List<Employee> getAll();

    Employee getById(Long id);

    Employee update(Long id, Employee employee);

    void delete(Long id);
}
