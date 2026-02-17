package com.project1.backend.controller;

import com.project1.backend.model.Product;
import com.project1.backend.service.ProductService;
import com.project1.backend.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class ClientController {
    @Autowired
    private ProductService productService;

    private final TestService  testService;

    public ClientController(TestService testService) {
        this.testService = testService;
    }

    // Hello World
    @GetMapping("/")
    public String helloWorld() {
        return "Hello World";
    }

    // Rest API CRUD

    // Create Product
    @PostMapping("/add")
    public Product createProduct(@RequestBody Product product) {
        return testService.createProduct(product);
    }
    
    // Read Products
    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/product/{id}")
    // Read Product By ID
    public Product getProductById(@PathVariable long id) {
        return productService.getProductById(id);
    }
    
    // Update Product
    @PutMapping("/update/{id}")
    public Product updateProduct(@RequestBody Product product, @PathVariable long id) {
        return productService.updateProduct(product, id);
    }

    // Delete Product
    @DeleteMapping("/delete/{id}")
    public void deleteProduct(@PathVariable long id) {
        productService.deleteProduct(id);
    }
}
