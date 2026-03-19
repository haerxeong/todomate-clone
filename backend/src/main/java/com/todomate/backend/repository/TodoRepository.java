package com.todomate.backend.repository;

import com.todomate.backend.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepository extends JpaRepository<Todo, String> {

  @Query("""
        select coalesce(max(t.orderIndex), -1)
        from Todo t
        where t.user.id = :userId
          and t.todoDate = :todoDate
    """)
  Integer findMaxOrderIndexByUserIdAndTodoDate(String userId, java.time.LocalDate todoDate);
}