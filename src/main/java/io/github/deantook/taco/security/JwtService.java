package io.github.deantook.taco.security;

import io.github.deantook.taco.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

/**
 * @author dean
 */
@Service
public class JwtService {

    private final JwtProperties props;
    private final SecretKey signKey;

    public JwtService(JwtProperties props) {
        this.props = props;
        this.signKey = Keys.hmacShaKeyFor(props.secret().getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(long userId, String username) {
        long expMs = props.expirationMs();
        Date now = new Date();
        Date exp = new Date(now.getTime() + expMs);
        return Jwts.builder()
            .subject(String.valueOf(userId))
            .claim("username", username)
            .issuedAt(now)
            .expiration(exp)
            .signWith(signKey)
            .compact();
    }

    public Claims parseAndValidate(String token) throws JwtException {
        return Jwts.parser()
            .verifyWith(signKey)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public long getExpirationMs() {
        return props.expirationMs();
    }
}
