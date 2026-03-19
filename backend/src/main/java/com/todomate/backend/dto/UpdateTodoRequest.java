package com.todomate.backend.dto;

import java.time.LocalDate;

public record UpdateTodoRequest(
    String userId,
    String categoryId,
    String text,
    LocalDate todoDate,
    Boolean done
) {
}