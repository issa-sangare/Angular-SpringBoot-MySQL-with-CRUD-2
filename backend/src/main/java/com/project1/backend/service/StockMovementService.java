package com.project1.backend.service;
import com.project1.backend.model.StockMovement;
import java.util.List;

public interface StockMovementService {

    StockMovement create(StockMovement movement);

    List<StockMovement> getAll();

    List<StockMovement> getByProduct(Long productId);
}
