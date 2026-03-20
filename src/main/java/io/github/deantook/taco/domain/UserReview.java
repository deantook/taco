package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 用户评价表
 * @TableName user_review
 */
@TableName(value ="user_review")
@Data
public class UserReview {
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
     * 评分（0-10，可带1位小数）
     */
    private BigDecimal rating;

    /**
     * 短评
     */
    private String shortReview;

    /**
     * 长评
     */
    private String longReview;

    /**
     * 是否含剧透
     */
    private Integer isSpoiler;

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
        UserReview other = (UserReview) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getUserId() == null ? other.getUserId() == null : this.getUserId().equals(other.getUserId()))
            && (this.getContentType() == null ? other.getContentType() == null : this.getContentType().equals(other.getContentType()))
            && (this.getContentId() == null ? other.getContentId() == null : this.getContentId().equals(other.getContentId()))
            && (this.getRating() == null ? other.getRating() == null : this.getRating().equals(other.getRating()))
            && (this.getShortReview() == null ? other.getShortReview() == null : this.getShortReview().equals(other.getShortReview()))
            && (this.getLongReview() == null ? other.getLongReview() == null : this.getLongReview().equals(other.getLongReview()))
            && (this.getIsSpoiler() == null ? other.getIsSpoiler() == null : this.getIsSpoiler().equals(other.getIsSpoiler()))
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
        result = prime * result + ((getRating() == null) ? 0 : getRating().hashCode());
        result = prime * result + ((getShortReview() == null) ? 0 : getShortReview().hashCode());
        result = prime * result + ((getLongReview() == null) ? 0 : getLongReview().hashCode());
        result = prime * result + ((getIsSpoiler() == null) ? 0 : getIsSpoiler().hashCode());
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
        sb.append(", rating=").append(rating);
        sb.append(", shortReview=").append(shortReview);
        sb.append(", longReview=").append(longReview);
        sb.append(", isSpoiler=").append(isSpoiler);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}