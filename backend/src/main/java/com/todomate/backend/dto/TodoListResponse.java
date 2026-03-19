package com.todomate.backend.dto;

import com.todomate.backend.domain.Todo;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record TodoListResponse(
    String id,
    String userId,
    String categoryId,
    String categoryName,
    String text,
    LocalDate todoDate,
    Boolean done,
    Short orderIndex,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
  public static TodoListResponse from(Todo todo) {
    return new TodoListResponse(
        todo.getId(),
        todo.getUser().getId(),
        todo.getCategory() != null ? todo.getCategory().getId() : null,
        todo.getCategory() != null ? todo.getCategory().getName() : null,
        todo.getText(),
        todo.getTodoDate(),
        todo.getDone(),
        todo.getOrderIndex(),
        todo.getCreatedAt(),
        todo.getUpdatedAt()
    );
  }
}