package io.github.deantook.taco.security;

/**
 * JWT 认证主体（无状态，不实现 UserDetails）
 */
public record JwtUserPrincipal(long userId, String username) {
}
