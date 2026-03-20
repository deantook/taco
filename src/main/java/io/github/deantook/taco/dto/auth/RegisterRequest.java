package io.github.deantook.taco.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * @author dean
 */
public record RegisterRequest(
    @NotBlank(message = "用户名不能为空")
    @Size(min = 3, max = 100, message = "用户名长度为 3–100")
    String username,

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    String email,

    @NotBlank(message = "密码不能为空")
    @Size(min = 8, max = 128, message = "密码长度为 8–128")
    String password
) {
}
