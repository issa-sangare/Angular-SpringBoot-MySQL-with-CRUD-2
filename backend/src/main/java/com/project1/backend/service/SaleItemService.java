package com.project1.backend.service;
import com.project1.backend.model.SaleItem;
import java.util.List;

public interface SaleItemService {

    List<SaleItem> getBySale(Long saleId);
}

