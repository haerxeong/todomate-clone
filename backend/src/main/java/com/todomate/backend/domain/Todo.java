package com.todomate.backend.domain;

import com.todomate.backend.domain.common.baseEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(
    name = "todos",
    indexes = {
        @Index(name = "idx_todos_user_date", columnList = "user_id, todo_date"),
        @Index(name = "idx_todos_category_date", columnList = "category_id, todo_date")
    }
)
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Todo extends BaseTimeEntity {

  @Id
  @GeneratedValue
  @org.hibernate.annotations.UuidGenerator
  @Column(name = "id", length = 36, nullable = false)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "category_id")
  private Category category;

  @Column(name = "text", nullable = false, length = 200)
  private String text;

  @Column(name = "todo_date", nullable = false)
  private LocalDate todoDate;

  @Column(name = "done", nullable = false)
  private Boolean done;

  @Column(name = "order_index", nullable = false)
  private Short orderIndex;

  public void updateText(String text) {
    this.text = text;
  }

  public void updateCategory(Category category) {
    this.category = category;
  }

  public void updateTodoDate(LocalDate todoDate) {
    this.todoDate = todoDate;
  }

  public void updateOrderIndex(Short orderIndex) {
    this.orderIndex = orderIndex;
  }

  public void toggleDone() {
    this.done = !this.done;
  }
}