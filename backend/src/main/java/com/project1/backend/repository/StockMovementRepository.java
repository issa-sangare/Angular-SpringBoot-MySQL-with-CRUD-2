package com.project1.backend.repository;

import com.project1.backend.model.StockMovement;
import com.project1.backend.model.Product;
import com.project1.backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    List<StockMovement> findByProduct(Product product);

    List<StockMovement> findByEmployee(Employee employee);

    List<StockMovement> findByType(String type);
}
