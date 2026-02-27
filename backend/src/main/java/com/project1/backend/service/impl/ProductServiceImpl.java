package com.project1.backend.service.impl;
import com.project1.backend.model.Product;
import com.project1.backend.repository.ProductRepository;
import com.project1.backend.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    // Créer un produit
    @Override
    public Product create(Product product) {
        return repository.save(product);
    }

    // Récupérer tous les produits
    @Override
    public List<Product> getAll() {
        return repository.findAll();
    }

    // Récupérer un produit par ID
    @Override
    public Product getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // Mettre à jour un produit
    @Override
    public Product update(Long id, Product product) {
        Product existing = getById(id);

        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setQuantity(product.getQuantity());
        existing.setDescription(product.getDescription());

        // Vérifier null avant d'affecter
        if (product.getCategory() != null) {
            existing.setCategory(product.getCategory());
        }

        if (product.getSupplier() != null) {
            existing.setSupplier(product.getSupplier());
        }

        return repository.save(existing);
    }

    // Supprimer un produit
    @Override
    public void delete(Long id) {
        Optional<Product> product = repository.findById(id);
        if (product.isPresent()) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Produit introuvable avec l'id: " + id + ". Il y a erreur 404 !!!");
        }
    }
}