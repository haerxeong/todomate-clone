package com.todomate.backend.repository;

import com.todomate.backend.domain.Friendship;
import com.todomate.backend.domain.enums.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendshipRepository extends JpaRepository<Friendship, String> {

  List<Friendship> findByRequesterIdAndStatus(String requesterId, FriendshipStatus status);

  List<Friendship> findByReceiverIdAndStatus(String receiverId, FriendshipStatus status);
}