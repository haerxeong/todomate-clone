package com.todomate.backend.service;

import com.todomate.backend.domain.Friendship;
import com.todomate.backend.domain.User;
import com.todomate.backend.domain.enums.FriendshipStatus;
import com.todomate.backend.dto.FriendResponse;
import com.todomate.backend.repository.FriendshipRepository;
import com.todomate.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FriendshipService {

  private final FriendshipRepository friendshipRepository;
  private final UserRepository userRepository;

  public List<FriendResponse> getFriends(String userId) {
    userRepository.findById(userId)
        .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));

    List<Friendship> requestedFriendships =
        friendshipRepository.findByRequesterIdAndStatus(userId, FriendshipStatus.ACCEPTED);

    List<Friendship> receivedFriendships =
        friendshipRepository.findByReceiverIdAndStatus(userId, FriendshipStatus.ACCEPTED);

    List<FriendResponse> result = new ArrayList<>();

    for (Friendship friendship : requestedFriendships) {
      User friend = friendship.getReceiver();
      result.add(toFriendResponse(friendship, friend));
    }

    for (Friendship friendship : receivedFriendships) {
      User friend = friendship.getRequester();
      result.add(toFriendResponse(friendship, friend));
    }

    return result;
  }

  private FriendResponse toFriendResponse(Friendship friendship, User friend) {
    return new FriendResponse(
        friendship.getId(),
        friend.getId(),
        friend.getEmail(),
        friend.getNickname(),
        friend.getProfileImg(),
        friend.getBio()
    );
  }
}