package com.project1.backend.repository;

import com.project1.backend.model.Product;
import com.project1.backend.model.Category;
import com.project1.backend.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory(Category category);

    List<Product> findBySupplier(Supplier supplier);

    List<Product> findByQuantityLessThan(int quantity);

    List<Product> findByNameContainingIgnoreCase(String name);
}