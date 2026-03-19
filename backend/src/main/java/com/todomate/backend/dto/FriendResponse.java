package com.todomate.backend.dto;

public record FriendResponse(
    String friendshipId,
    String friendId,
    String email,
    String nickname,
    String profileImg,
    String bio
) {
}