package com.project1.backend.controller;

import com.project1.backend.model.StockMovement;
import com.project1.backend.service.StockMovementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/stock-movements")
public class StockMovementController {

    private final StockMovementService service;

    public StockMovementController(StockMovementService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public StockMovement create(@RequestBody StockMovement movement) {
        return service.create(movement);
    }

    @GetMapping
    public List<StockMovement> getAll() {
        return service.getAll();
    }

    @GetMapping("/stock-movement/{productId}")
    public List<StockMovement> getByProduct(@PathVariable Long productId) {
        return service.getByProduct(productId);
    }
}
