package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.dto.auth.LoginRequest;
import io.github.deantook.taco.dto.auth.RegisterRequest;
import io.github.deantook.taco.dto.auth.TokenResponse;
import io.github.deantook.taco.dto.auth.UserPublicResponse;
import io.github.deantook.taco.security.JwtUserPrincipal;
import io.github.deantook.taco.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author dean
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ApiResult<TokenResponse> register(@Valid @RequestBody RegisterRequest request) {
        return ApiResult.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ApiResult<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResult.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ApiResult<UserPublicResponse> me(@AuthenticationPrincipal JwtUserPrincipal principal) {
        return ApiResult.ok(authService.me(principal.userId()));
    }
}
