package com.todomate.backend.controller;

import com.todomate.backend.dto.FriendResponse;
import com.todomate.backend.service.FriendshipService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friendships")
@RequiredArgsConstructor
public class FriendshipController {

  private final FriendshipService friendshipService;

  @GetMapping("/friends")
  public List<FriendResponse> getFriends(@RequestParam String userId) {
    return friendshipService.getFriends(userId);
  }
}