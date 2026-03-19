package com.todomate.backend.service;

import com.todomate.backend.domain.Category;
import com.todomate.backend.domain.Todo;
import com.todomate.backend.domain.User;
import com.todomate.backend.repository.CategoryRepository;
import com.todomate.backend.repository.TodoRepository;
import com.todomate.backend.repository.UserRepository;
import com.todomate.backend.dto.CreateTodoRequest;
import com.todomate.backend.dto.TodoResponse;
import jakarta.persistence.EntityNotFoundException;
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
}