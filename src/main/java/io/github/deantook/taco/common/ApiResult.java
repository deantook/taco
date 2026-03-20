package io.github.deantook.taco.common;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author dean
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResult<T>(int code, String message, T data, long timestamp) {

    public static <T> ApiResult<T> ok() {
        return ok(null);
    }

    public static <T> ApiResult<T> ok(T data) {
        return new ApiResult<>(
            ResultCode.SUCCESS.code(),
            ResultCode.SUCCESS.message(),
            data,
            System.currentTimeMillis());
    }

    public static <T> ApiResult<T> fail(int code, String message) {
        return new ApiResult<>(code, message, null, System.currentTimeMillis());
    }

    public static <T> ApiResult<T> fail(ResultCode resultCode) {
        return fail(resultCode.code(), resultCode.message());
    }
}
