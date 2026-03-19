package com.todomate.backend.domain;

import com.todomate.backend.domain.common.baseEntity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User extends BaseTimeEntity {

  @Id
  @GeneratedValue
  @org.hibernate.annotations.UuidGenerator
  @Column(name = "id", length = 36, nullable = false)
  private String id;

  @Column(name = "email", nullable = false, unique = true, length = 255)
  private String email;

  @Column(name = "password_hash", nullable = false, length = 255)
  private String passwordHash;

  @Column(name = "nickname", nullable = false, length = 20)
  private String nickname;

  @Column(name = "profile_img", length = 512)
  private String profileImg;

  @Column(name = "bio", length = 100)
  private String bio;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<Category> categories = new ArrayList<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<Todo> todos = new ArrayList<>();

  @OneToMany(mappedBy = "requester", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<Friendship> requestedFriendships = new ArrayList<>();

  @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL, orphanRemoval = true)
  @Builder.Default
  private List<Friendship> receivedFriendships = new ArrayList<>();
}