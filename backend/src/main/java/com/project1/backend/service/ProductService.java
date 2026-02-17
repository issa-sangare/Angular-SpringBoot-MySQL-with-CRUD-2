package com.project1.backend.service;

import com.project1.backend.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    // Create Product
    public Product createProduct(Product product);

    // Read Products
    public List<Product> getProducts();

    // Read Product By ID
    public Product getProductById(Long id);

    // Update Product
    public Product updateProduct(Product product, long id);

    // Delete Product
    public void deleteProduct(Long id);
}
