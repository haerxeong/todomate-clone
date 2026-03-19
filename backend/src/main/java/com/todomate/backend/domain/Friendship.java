package com.todomate.backend.domain;

import com.todomate.backend.domain.enums.FriendshipStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
    name = "friendships",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uq_friendships_pair",
            columnNames = {"requester_id", "receiver_id"}
        )
    }
)
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Friendship {

  @Id
  @Column(name = "id", length = 36, nullable = false)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "requester_id", nullable = false)
  private User requester;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "receiver_id", nullable = false)
  private User receiver;

  @Enumerated(EnumType.STRING)
  @Column(name = "status", nullable = false, length = 20)
  private FriendshipStatus status;

  @Column(name = "requested_at", nullable = false, updatable = false)
  private LocalDateTime requestedAt;

  @Column(name = "accepted_at")
  private LocalDateTime acceptedAt;

  @PrePersist
  private void onCreate() {
    if (this.id == null) {
      this.id = UUID.randomUUID().toString();
    }
    if (this.status == null) {
      this.status = FriendshipStatus.PENDING;
    }
    if (this.requestedAt == null) {
      this.requestedAt = LocalDateTime.now();
    }
  }

  public void accept() {
    this.status = FriendshipStatus.ACCEPTED;
    this.acceptedAt = LocalDateTime.now();
  }

  public void block() {
    this.status = FriendshipStatus.BLOCKED;
  }
}