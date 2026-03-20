package io.github.deantook.taco.service;

import io.github.deantook.taco.dto.auth.LoginRequest;
import io.github.deantook.taco.dto.auth.RegisterRequest;
import io.github.deantook.taco.dto.auth.TokenResponse;
import io.github.deantook.taco.dto.auth.UserPublicResponse;

/**
 * @author dean
 */
public interface AuthService {

    TokenResponse register(RegisterRequest request);

    TokenResponse login(LoginRequest request);

    UserPublicResponse me(long userId);
}
