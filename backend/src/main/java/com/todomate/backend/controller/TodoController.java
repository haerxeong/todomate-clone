package com.todomate.backend.controller;

import com.todomate.backend.dto.CreateTodoRequest;
import com.todomate.backend.dto.TodoListResponse;
import com.todomate.backend.dto.TodoResponse;
import com.todomate.backend.dto.UpdateTodoRequest;
import com.todomate.backend.service.TodoService;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

  private final TodoService todoService;

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public TodoResponse createTodo(@Valid @RequestBody CreateTodoRequest request) {
    return todoService.createTodo(request);
  }

  @GetMapping
  public List<TodoListResponse> getTodos(
      @RequestParam String userId,
      @RequestParam(required = false)
      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate todoDate,
      @RequestParam(required = false) String categoryId
  ) {
    return todoService.getTodos(userId, todoDate, categoryId);
  }

  @PatchMapping("/{todoId}")
  public TodoResponse updateTodo(
      @PathVariable String todoId,
      @RequestBody UpdateTodoRequest request
  ) {
    return todoService.updateTodo(todoId, request);
  }
}