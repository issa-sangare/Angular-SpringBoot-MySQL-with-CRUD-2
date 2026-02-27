package com.project1.backend.controller;

import com.project1.backend.model.Sale;
import com.project1.backend.service.SaleService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sales")
public class SaleController {

    private final SaleService service;

    public SaleController(SaleService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Sale create(@RequestBody Sale sale) {
        return service.createSale(sale);
    }

    @GetMapping
    public List<Sale> getAll() {
        return service.getAll();
    }

    @GetMapping("/sale/{id}")
    public Sale getById(@PathVariable Long id) {
        return service.getById(id);
    }
}
