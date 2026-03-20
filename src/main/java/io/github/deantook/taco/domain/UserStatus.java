package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.EnumValue;

/**
 * 与 MySQL user.status ENUM 对应
 */
public enum UserStatus {

    ACTIVE("active"),
    DISABLED("disabled");

    @EnumValue
    private final String code;

    UserStatus(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
