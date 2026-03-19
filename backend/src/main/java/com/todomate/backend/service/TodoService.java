package com.todomate.backend.service;

import com.todomate.backend.domain.Category;
import com.todomate.backend.domain.Todo;
import com.todomate.backend.domain.User;
import com.todomate.backend.dto.TodoListResponse;
import com.todomate.backend.dto.UpdateTodoRequest;
import com.todomate.backend.repository.CategoryRepository;
import com.todomate.backend.repository.TodoRepository;
import com.todomate.backend.repository.UserRepository;
import com.todomate.backend.dto.CreateTodoRequest;
import com.todomate.backend.dto.TodoResponse;
import jakarta.persistence.EntityNotFoundException;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class TodoService {

  private final TodoRepository todoRepository;
  private final UserRepository userRepository;
  private final CategoryRepository categoryRepository;

  public TodoResponse createTodo(CreateTodoRequest request) {
    User user = userRepository.findById(request.userId())
        .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

    Category category = null;
    if (request.categoryId() != null && !request.categoryId().isBlank()) {
      category = categoryRepository.findByIdAndUserId(request.categoryId(), request.userId())
          .orElseThrow(() -> new EntityNotFoundException("카테고리를 찾을 수 없거나 해당 사용자의 카테고리가 아닙니다."));
    }

    Integer maxOrderIndex = todoRepository.findMaxOrderIndexByUserIdAndTodoDate(
        request.userId(),
        request.todoDate()
    );

    short nextOrderIndex = (short) (maxOrderIndex + 1);

    Todo todo = Todo.builder()
        .user(user)
        .category(category)
        .text(request.text())
        .todoDate(request.todoDate())
        .done(false)
        .orderIndex(nextOrderIndex)
        .build();

    Todo savedTodo = todoRepository.save(todo);

    return TodoResponse.from(savedTodo);
  }

  @Transactional(readOnly = true)
  public List<TodoListResponse> getTodos(String userId, LocalDate todoDate, String categoryId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

    List<Todo> todos;

    if (todoDate != null && categoryId != null && !categoryId.isBlank()) {
      validateCategoryOwner(userId, categoryId);
      todos = todoRepository.findByUserIdAndTodoDateAndCategoryIdOrderByOrderIndexAsc(
          userId, todoDate, categoryId
      );
    } else if (todoDate != null) {
      todos = todoRepository.findByUserIdAndTodoDateOrderByOrderIndexAsc(userId, todoDate);
    } else if (categoryId != null && !categoryId.isBlank()) {
      validateCategoryOwner(userId, categoryId);
      todos = todoRepository.findByUserIdAndCategoryIdOrderByTodoDateAscOrderIndexAsc(userId, categoryId);
    } else {
      todos = todoRepository.findByUserIdOrderByTodoDateAscOrderIndexAsc(userId);
    }

    return todos.stream()
        .map(TodoListResponse::from)
        .toList();
  }

  @Transactional
  public TodoResponse updateTodo(String todoId, UpdateTodoRequest request) {
    if (request.userId() == null || request.userId().isBlank()) {
      throw new IllegalArgumentException("userId는 필수입니다.");
    }

    Todo todo = todoRepository.findByIdAndUserId(todoId, request.userId())
        .orElseThrow(() -> new EntityNotFoundException("할 일을 찾을 수 없습니다."));

    if (request.categoryId() != null && request.categoryId().isBlank()) {
      todo.updateCategory(null);
    } else if (request.categoryId() != null) {
      Category category = categoryRepository.findByIdAndUserId(request.categoryId(), request.userId())
          .orElseThrow(() -> new EntityNotFoundException("카테고리를 찾을 수 없거나 해당 사용자의 카테고리가 아닙니다."));
      todo.updateCategory(category);
    }

    if (request.text() != null) {
      todo.updateText(request.text());
    }

    if (request.todoDate() != null) {
      todo.updateTodoDate(request.todoDate());
    }

    if (request.done() != null) {
      todo.toggleDone();
    }

    return TodoResponse.from(todo);
  }

  private void validateCategoryOwner(String userId, String categoryId) {
    categoryRepository.findByIdAndUserId(categoryId, userId)
        .orElseThrow(() -> new EntityNotFoundException("카테고리를 찾을 수 없거나 해당 사용자의 카테고리가 아닙니다."));
  }
}