package io.github.deantook.taco.dto.auth;

import jakarta.validation.constraints.NotBlank;

/**
 * @author dean
 */
public record LoginRequest(
    @NotBlank(message = "用户名或邮箱不能为空")
    String login,

    @NotBlank(message = "密码不能为空")
    String password
) {
}
