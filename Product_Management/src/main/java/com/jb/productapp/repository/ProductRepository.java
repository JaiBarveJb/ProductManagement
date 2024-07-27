package com.jb.productapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jb.productapp.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
