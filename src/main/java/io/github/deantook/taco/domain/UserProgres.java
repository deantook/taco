package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 用户进度表
 * @TableName user_progres
 */
@TableName(value ="user_progres")
@Data
public class UserProgres {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 内容类型
     */
    private Object contentType;

    /**
     * 内容ID
     */
    private Long contentId;

    /**
     * 进度百分比（0-100）
     */
    private BigDecimal progressPercent;

    /**
     * 当前进度（页数/第几集）
     */
    private Integer currentValue;

    /**
     * 总量（总页数/总集数）
     */
    private Integer totalValue;

    /**
     * 最近一次观看/阅读时间
     */
    private Date lastActionAt;

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
        UserProgres other = (UserProgres) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getContentType() == null ? other.getContentType() == null : this.getContentType().equals(other.getContentType()))
            && (this.getContentId() == null ? other.getContentId() == null : this.getContentId().equals(other.getContentId()))
            && (this.getProgressPercent() == null ? other.getProgressPercent() == null : this.getProgressPercent().equals(other.getProgressPercent()))
            && (this.getCurrentValue() == null ? other.getCurrentValue() == null : this.getCurrentValue().equals(other.getCurrentValue()))
            && (this.getTotalValue() == null ? other.getTotalValue() == null : this.getTotalValue().equals(other.getTotalValue()))
            && (this.getLastActionAt() == null ? other.getLastActionAt() == null : this.getLastActionAt().equals(other.getLastActionAt()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getUserId() == null) ? 0 : getUserId().hashCode());
        result = prime * result + ((getContentType() == null) ? 0 : getContentType().hashCode());
        result = prime * result + ((getContentId() == null) ? 0 : getContentId().hashCode());
        result = prime * result + ((getProgressPercent() == null) ? 0 : getProgressPercent().hashCode());
        result = prime * result + ((getCurrentValue() == null) ? 0 : getCurrentValue().hashCode());
        result = prime * result + ((getTotalValue() == null) ? 0 : getTotalValue().hashCode());
        result = prime * result + ((getLastActionAt() == null) ? 0 : getLastActionAt().hashCode());
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
        sb.append(", userId=").append(userId);
        sb.append(", contentType=").append(contentType);
        sb.append(", contentId=").append(contentId);
        sb.append(", progressPercent=").append(progressPercent);
        sb.append(", currentValue=").append(currentValue);
        sb.append(", totalValue=").append(totalValue);
        sb.append(", lastActionAt=").append(lastActionAt);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}