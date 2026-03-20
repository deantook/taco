package io.github.deantook.taco.dto.auth;

import io.github.deantook.taco.domain.User;
import io.github.deantook.taco.domain.UserStatus;

/**
 * @author dean
 */
public record UserPublicResponse(
    Long id,
    String username,
    String email,
    String avatar,
    String bio,
    UserStatus status
) {

    public static UserPublicResponse from(User u) {
        return new UserPublicResponse(
            u.getId(),
            u.getUsername(),
            u.getEmail(),
            u.getAvatar(),
            u.getBio(),
            u.getStatus());
    }
}
