package com.todomate.backend.dto;

import com.todomate.backend.domain.Category;

import java.time.LocalDateTime;

public record CategoryResponse(
    String id,
    String userId,
    String name,
    String icon,
    Short orderIndex,
    LocalDateTime createdAt
) {
  public static CategoryResponse from(Category category) {
    return new CategoryResponse(
        category.getId(),
        category.getUser().getId(),
        category.getName(),
        category.getIcon(),
        category.getOrderIndex(),
        category.getCreatedAt()
    );
  }
}