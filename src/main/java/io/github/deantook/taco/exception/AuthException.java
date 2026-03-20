package io.github.deantook.taco.exception;

import io.github.deantook.taco.common.ResultCode;

/**
 * 认证/注册等业务失败（由 GlobalExceptionHandler 转为 ApiResult）
 */
public class AuthException extends RuntimeException {

    private final ResultCode resultCode;

    public AuthException(ResultCode resultCode) {
        super(resultCode.message());
        this.resultCode = resultCode;
    }

    public ResultCode getResultCode() {
        return resultCode;
    }
}
