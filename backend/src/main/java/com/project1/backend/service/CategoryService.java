package com.project1.backend.service;

import com.project1.backend.model.Category;

import java.util.List;

public interface CategoryService {

    Category create(Category category);

    List<Category> getAll();

    Category getById(Long id);

    Category update(Long id, Category category);

    void delete(Long id);
}
