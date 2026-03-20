package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 人物表（演员/导演/作者等统一实体）
 * @TableName person
 */
@TableName(value ="person")
@Data
public class Person {
    /**
     * 人物ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 姓名（展示名）
     */
    private String name;

    /**
     * 原名（外文名）
     */
    private String originalName;

    /**
     * 头像URL
     */
    private String avatar;

    /**
     * 人物简介
     */
    private String bio;

    /**
     * 别名（JSON数组，如["周星驰","Stephen Chow"]）
     */
    private Object aliases;

    /**
     * 性别
     */
    private Object gender;

    /**
     * 出生日期
     */
    private Date birthDate;

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * 更新时间
     */
    private Date updatedAt;

    @Override
    public boolean equals(Object that) {
        if (this == that) {
            return true;
        }
        if (that == null) {
            return false;
        }
        if (getClass() != that.getClass()) {
            return false;
        }
        Person other = (Person) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getName() == null ? other.getName() == null : this.getName().equals(other.getName()))
            && (this.getOriginalName() == null ? other.getOriginalName() == null : this.getOriginalName().equals(other.getOriginalName()))
            && (this.getAvatar() == null ? other.getAvatar() == null : this.getAvatar().equals(other.getAvatar()))
            && (this.getBio() == null ? other.getBio() == null : this.getBio().equals(other.getBio()))
            && (this.getAliases() == null ? other.getAliases() == null : this.getAliases().equals(other.getAliases()))
            && (this.getGender() == null ? other.getGender() == null : this.getGender().equals(other.getGender()))
            && (this.getBirthDate() == null ? other.getBirthDate() == null : this.getBirthDate().equals(other.getBirthDate()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getName() == null) ? 0 : getName().hashCode());
        result = prime * result + ((getOriginalName() == null) ? 0 : getOriginalName().hashCode());
        result = prime * result + ((getAvatar() == null) ? 0 : getAvatar().hashCode());
        result = prime * result + ((getBio() == null) ? 0 : getBio().hashCode());
        result = prime * result + ((getAliases() == null) ? 0 : getAliases().hashCode());
        result = prime * result + ((getGender() == null) ? 0 : getGender().hashCode());
        result = prime * result + ((getBirthDate() == null) ? 0 : getBirthDate().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        result = prime * result + ((getUpdatedAt() == null) ? 0 : getUpdatedAt().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append(", originalName=").append(originalName);
        sb.append(", avatar=").append(avatar);
        sb.append(", bio=").append(bio);
        sb.append(", aliases=").append(aliases);
        sb.append(", gender=").append(gender);
        sb.append(", birthDate=").append(birthDate);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}