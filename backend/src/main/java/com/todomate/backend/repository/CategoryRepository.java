package com.todomate.backend.repository;

import com.todomate.backend.domain.Category;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String> {

  Optional<Category> findByIdAndUserId(String id, String userId);

  List<Category> findByUserIdOrderByOrderIndexAsc(String userId);
}