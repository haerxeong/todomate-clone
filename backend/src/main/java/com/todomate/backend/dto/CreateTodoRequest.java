package com.todomate.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateTodoRequest(

    @NotNull
    String userId,

    String categoryId,

    @NotBlank
    @Size(max = 200)
    String text,

    @NotNull
    LocalDate todoDate
) {
}