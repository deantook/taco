package io.github.deantook.taco.dto.auth;

/**
 * @author dean
 */
public record TokenResponse(
    String token,
    String tokenType,
    long expiresIn,
    UserPublicResponse user
) {
}
