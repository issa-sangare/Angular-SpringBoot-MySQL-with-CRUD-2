package com.project1.backend.service;

import com.project1.backend.model.Sale;

import java.util.List;

public interface SaleService {

    Sale createSale(Sale sale);

    List<Sale> getAll();

    Sale getById(Long id);
}

