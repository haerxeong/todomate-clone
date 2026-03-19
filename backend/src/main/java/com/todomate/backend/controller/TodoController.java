package com.todomate.backend.controller;

import com.todomate.backend.dto.CreateTodoRequest;
import com.todomate.backend.dto.TodoResponse;
import com.todomate.backend.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
}