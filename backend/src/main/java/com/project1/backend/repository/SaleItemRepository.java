package com.project1.backend.repository;

import com.project1.backend.model.SaleItem;
import com.project1.backend.model.Product;
import com.project1.backend.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    List<SaleItem> findBySale(Sale sale);

    List<SaleItem> findByProduct(Product product);
}
