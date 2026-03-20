package io.github.deantook.taco.exception;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.ResultCode;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author dean
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResult<Void> handleValidation(MethodArgumentNotValidException ex) {
        FieldError fe = ex.getBindingResult().getFieldError();
        String msg = fe != null && fe.getDefaultMessage() != null
            ? fe.getDefaultMessage()
            : ResultCode.BAD_REQUEST.message();
        return ApiResult.fail(ResultCode.BAD_REQUEST.code(), msg);
    }

    @ExceptionHandler(AuthException.class)
    @ResponseStatus(HttpStatus.OK)
    public ApiResult<Void> handleAuth(AuthException ex) {
        return ApiResult.fail(ex.getResultCode());
    }
}
