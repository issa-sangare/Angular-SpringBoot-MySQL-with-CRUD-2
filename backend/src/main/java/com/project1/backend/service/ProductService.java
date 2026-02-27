package com.project1.backend.service;
import com.project1.backend.model.Product;

import java.util.List;

public interface ProductService {

    Product create(Product product);

    List<Product> getAll();

    Product getById(Long id);

    Product update(Long id, Product product);

    void delete(Long id);
}