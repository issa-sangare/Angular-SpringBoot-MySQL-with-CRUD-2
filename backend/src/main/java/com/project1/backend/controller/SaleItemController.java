package com.project1.backend.controller;

import com.project1.backend.model.SaleItem;
import com.project1.backend.service.SaleItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sale-items")
public class SaleItemController {

    private final SaleItemService service;

    public SaleItemController(SaleItemService service) {
        this.service = service;
    }

    @GetMapping("/sale-item/{saleId}")
    public List<SaleItem> getBySale(@PathVariable Long saleId) {
        return service.getBySale(saleId);
    }
}
