package io.github.deantook.taco.service.impl;

import io.github.deantook.taco.domain.User;
import io.github.deantook.taco.domain.UserStatus;
import io.github.deantook.taco.dto.auth.LoginRequest;
import io.github.deantook.taco.dto.auth.RegisterRequest;
import io.github.deantook.taco.dto.auth.TokenResponse;
import io.github.deantook.taco.dto.auth.UserPublicResponse;
import io.github.deantook.taco.exception.AuthException;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.security.JwtService;
import io.github.deantook.taco.service.UserService;
import io.github.deantook.taco.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * @author dean
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public TokenResponse register(RegisterRequest request) {
        if (userService.lambdaQuery().eq(User::getUsername, request.username()).exists()) {
            throw new AuthException(ResultCode.USER_ALREADY_EXISTS);
        }
        if (userService.lambdaQuery().eq(User::getEmail, request.email()).exists()) {
            throw new AuthException(ResultCode.USER_ALREADY_EXISTS);
        }
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setStatus(UserStatus.ACTIVE);
        userService.save(user);
        return issueToken(user);
    }

    @Override
    public TokenResponse login(LoginRequest request) {
        String login = request.login().trim();
        User user = userService.lambdaQuery()
            .and(w -> w.eq(User::getUsername, login).or().eq(User::getEmail, login))
            .one();
        if (user == null || !passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new AuthException(ResultCode.INVALID_CREDENTIALS);
        }
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new AuthException(ResultCode.ACCOUNT_DISABLED);
        }
        return issueToken(user);
    }

    @Override
    public UserPublicResponse me(long userId) {
        User user = userService.getById(userId);
        if (user == null) {
            throw new AuthException(ResultCode.NOT_FOUND);
        }
        return UserPublicResponse.from(user);
    }

    private TokenResponse issueToken(User user) {
        String token = jwtService.createToken(user.getId(), user.getUsername());
        return new TokenResponse(
            token,
            "Bearer",
            jwtService.getExpirationMs(),
            UserPublicResponse.from(user));
    }
}
