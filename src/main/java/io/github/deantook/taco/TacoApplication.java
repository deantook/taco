package io.github.deantook.taco;

import io.github.deantook.taco.config.JwtProperties;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

/**
 * @author dean
 */
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@MapperScan("io.github.deantook.taco.mapper")
@EnableConfigurationProperties(JwtProperties.class)
public class TacoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TacoApplication.class, args);
    }
}
