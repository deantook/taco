package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 演职人员关系表（系统核心关系层）
 * @TableName credit
 */
@TableName(value ="credit")
@Data
public class Credit {
    /**
     * 关系ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 内容类型
     */
    private Object contentType;

    /**
     * 内容ID（对应books/movies等表）
     */
    private Long contentId;

    /**
     * 人物ID
     */
    private Long personId;

    /**
     * 角色类型ID
     */
    private Integer roleId;

    /**
     * 细分角色（如主演/原作/客串等）
     */
    private String subRole;

    /**
     * 饰演角色名（演员/配音专用）
     */
    private String characterName;

    /**
     * 排序（演员表顺序，越小越靠前）
     */
    private Integer order;

    /**
     * 扩展字段（奖项/备注等）
     */
    private Object extra;

    /**
     * 创建时间
     */
    private Date createdAt;

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
        Credit other = (Credit) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getContentType() == null ? other.getContentType() == null : this.getContentType().equals(other.getContentType()))
            && (this.getContentId() == null ? other.getContentId() == null : this.getContentId().equals(other.getContentId()))
            && (this.getPersonId() == null ? other.getPersonId() == null : this.getPersonId().equals(other.getPersonId()))
            && (this.getRoleId() == null ? other.getRoleId() == null : this.getRoleId().equals(other.getRoleId()))
            && (this.getSubRole() == null ? other.getSubRole() == null : this.getSubRole().equals(other.getSubRole()))
            && (this.getCharacterName() == null ? other.getCharacterName() == null : this.getCharacterName().equals(other.getCharacterName()))
            && (this.getOrder() == null ? other.getOrder() == null : this.getOrder().equals(other.getOrder()))
            && (this.getExtra() == null ? other.getExtra() == null : this.getExtra().equals(other.getExtra()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getContentType() == null) ? 0 : getContentType().hashCode());
        result = prime * result + ((getContentId() == null) ? 0 : getContentId().hashCode());
        result = prime * result + ((getPersonId() == null) ? 0 : getPersonId().hashCode());
        result = prime * result + ((getRoleId() == null) ? 0 : getRoleId().hashCode());
        result = prime * result + ((getSubRole() == null) ? 0 : getSubRole().hashCode());
        result = prime * result + ((getCharacterName() == null) ? 0 : getCharacterName().hashCode());
        result = prime * result + ((getOrder() == null) ? 0 : getOrder().hashCode());
        result = prime * result + ((getExtra() == null) ? 0 : getExtra().hashCode());
        result = prime * result + ((getCreatedAt() == null) ? 0 : getCreatedAt().hashCode());
        return result;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", contentType=").append(contentType);
        sb.append(", contentId=").append(contentId);
        sb.append(", personId=").append(personId);
        sb.append(", roleId=").append(roleId);
        sb.append(", subRole=").append(subRole);
        sb.append(", characterName=").append(characterName);
        sb.append(", order=").append(order);
        sb.append(", extra=").append(extra);
        sb.append(", createdAt=").append(createdAt);
        sb.append("]");
        return sb.toString();
    }
}