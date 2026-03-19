package com.todomate.backend.service;

import com.todomate.backend.dto.CategoryResponse;
import com.todomate.backend.domain.Category;
import com.todomate.backend.repository.CategoryRepository;
import com.todomate.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

  private final CategoryRepository categoryRepository;
  private final UserRepository userRepository;

  public List<CategoryResponse> getCategories(String userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

    List<Category> categories = categoryRepository.findByUserIdOrderByOrderIndexAsc(userId);

    return categories.stream()
        .map(CategoryResponse::from)
        .toList();
  }
}