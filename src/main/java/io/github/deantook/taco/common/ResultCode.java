package io.github.deantook.taco.common;

/**
 * @author dean
 */
public enum ResultCode {

    SUCCESS(0, "ok"),
    BAD_REQUEST(40001, "参数错误"),
    INVALID_CREDENTIALS(40002, "用户名或密码错误"),
    UNAUTHORIZED(40101, "未登录或令牌无效"),
    FORBIDDEN(40301, "无权限"),
    NOT_FOUND(40401, "资源不存在"),
    USER_ALREADY_EXISTS(40901, "用户名或邮箱已存在"),
    ACCOUNT_DISABLED(40302, "账号已禁用"),
    INTERNAL_ERROR(50001, "服务器内部错误");

    private final int code;
    private final String message;

    ResultCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int code() {
        return code;
    }

    public String message() {
        return message;
    }
}
