package io.github.deantook.taco.common;

/**
 * @author dean
 */
public enum ResultCode {

    SUCCESS(0, "ok"),
    BAD_REQUEST(40001, "参数错误"),
    NOT_FOUND(40401, "资源不存在"),
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
