package com.project1.backend.service.impl;

import com.project1.backend.model.Sale;
import com.project1.backend.model.SaleItem;
import com.project1.backend.repository.SaleItemRepository;
import com.project1.backend.repository.SaleRepository;
import com.project1.backend.service.SaleItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleItemServiceImpl implements SaleItemService {

    private final SaleItemRepository repository;
    private final SaleRepository saleRepository;

    public SaleItemServiceImpl(SaleItemRepository repository,
                               SaleRepository saleRepository) {
        this.repository = repository;
        this.saleRepository = saleRepository;
    }

    @Override
    public List<SaleItem> getBySale(Long saleId) {

        Sale sale = saleRepository.findById(saleId)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        return repository.findBySale(sale);
    }
}
