package io.github.deantook.taco.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author dean
 */
@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(String secret, long expirationMs) {
}
