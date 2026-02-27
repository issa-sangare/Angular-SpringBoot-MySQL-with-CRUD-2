package com.project1.backend.service.impl;

import com.project1.backend.model.Product;
import com.project1.backend.model.Sale;
import com.project1.backend.repository.ProductRepository;
import com.project1.backend.repository.SaleRepository;
import com.project1.backend.service.SaleService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleServiceImpl(SaleRepository saleRepository,
                           ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Sale createSale(Sale sale) {

        sale.getItems().forEach(item -> {

            Product product = productRepository.findById(
                            item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }

            product.setQuantity(product.getQuantity() - item.getQuantity());
            productRepository.save(product);

            item.setSale(sale);
        });

        return saleRepository.save(sale);
    }

    @Override
    public List<Sale> getAll() {
        return saleRepository.findAll();
    }

    @Override
    public Sale getById(Long id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
    }
}
