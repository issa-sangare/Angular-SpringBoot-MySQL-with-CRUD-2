package com.project1.backend.service;

import com.project1.backend.model.Supplier;

import java.util.List;

public interface SupplierService {

    Supplier create(Supplier supplier);

    List<Supplier> getAll();

    Supplier getById(Long id);

    Supplier update(Long id, Supplier supplier);

    void delete(Long id);
}
