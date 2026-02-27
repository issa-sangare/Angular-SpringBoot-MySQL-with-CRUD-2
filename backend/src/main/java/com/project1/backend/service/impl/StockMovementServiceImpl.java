package com.project1.backend.service.impl;

import com.project1.backend.model.Product;
import com.project1.backend.model.StockMovement;
import com.project1.backend.repository.ProductRepository;
import com.project1.backend.repository.StockMovementRepository;
import com.project1.backend.service.StockMovementService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository repository;
    private final ProductRepository productRepository;

    public StockMovementServiceImpl(
            StockMovementRepository repository,
            ProductRepository productRepository) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    @Override
    public StockMovement create(StockMovement movement) {

        Product product = productRepository.findById(
                        movement.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (movement.getType().equalsIgnoreCase("OUT")) {
            product.setQuantity(product.getQuantity() - movement.getQuantity());
        } else {
            product.setQuantity(product.getQuantity() + movement.getQuantity());
        }

        productRepository.save(product);

        return repository.save(movement);
    }

    @Override
    public List<StockMovement> getAll() {
        return repository.findAll();
    }

    @Override
    public List<StockMovement> getByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return repository.findByProduct(product);
    }
}
