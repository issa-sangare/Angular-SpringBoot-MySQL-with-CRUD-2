package com.project1.backend.repository;

import com.project1.backend.model.Sale;
import com.project1.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {

    List<Sale> findByEmployee(Employee employee);

    List<Sale> findBySaleDateBetween(LocalDateTime start, LocalDateTime end);
}
