package io.github.deantook.taco;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author dean
 */
@SpringBootApplication
@MapperScan("io.github.deantook.taco.mapper")
public class TacoApplication {
    public static void main(String[] args) {
        SpringApplication.run(TacoApplication.class, args);
    }
}
