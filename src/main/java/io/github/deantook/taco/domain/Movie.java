package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 电影表
 * @author dean
 * @TableName movie
 */
@TableName(value ="movie")
@Data
public class Movie {
    /**
     * 电影ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 电影名称
     */
    private String title;

    /**
     * 原始名称
     */
    private String originalTitle;

    /**
     * 简介
     */
    private String description;

    /**
     * 时长（分钟）
     */
    private Integer duration;

    /**
     * 上映日期
     */
    private Date releaseDate;

    /**
     * 国家/地区
     */
    private String country;

    /**
     * 语言
     */
    private String language;

    /**
     * 封面图
     */
    private String coverUrl;

    /**
     * 扩展字段（票房/分级等）
     */
    private Object metadata;

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
        Movie other = (Movie) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getOriginalTitle() == null ? other.getOriginalTitle() == null : this.getOriginalTitle().equals(other.getOriginalTitle()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getDuration() == null ? other.getDuration() == null : this.getDuration().equals(other.getDuration()))
            && (this.getReleaseDate() == null ? other.getReleaseDate() == null : this.getReleaseDate().equals(other.getReleaseDate()))
            && (this.getCountry() == null ? other.getCountry() == null : this.getCountry().equals(other.getCountry()))
            && (this.getLanguage() == null ? other.getLanguage() == null : this.getLanguage().equals(other.getLanguage()))
            && (this.getCoverUrl() == null ? other.getCoverUrl() == null : this.getCoverUrl().equals(other.getCoverUrl()))
            && (this.getMetadata() == null ? other.getMetadata() == null : this.getMetadata().equals(other.getMetadata()))
            && (this.getCreatedAt() == null ? other.getCreatedAt() == null : this.getCreatedAt().equals(other.getCreatedAt()))
            && (this.getUpdatedAt() == null ? other.getUpdatedAt() == null : this.getUpdatedAt().equals(other.getUpdatedAt()));
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((getId() == null) ? 0 : getId().hashCode());
        result = prime * result + ((getTitle() == null) ? 0 : getTitle().hashCode());
        result = prime * result + ((getOriginalTitle() == null) ? 0 : getOriginalTitle().hashCode());
        result = prime * result + ((getDescription() == null) ? 0 : getDescription().hashCode());
        result = prime * result + ((getDuration() == null) ? 0 : getDuration().hashCode());
        result = prime * result + ((getReleaseDate() == null) ? 0 : getReleaseDate().hashCode());
        result = prime * result + ((getCountry() == null) ? 0 : getCountry().hashCode());
        result = prime * result + ((getLanguage() == null) ? 0 : getLanguage().hashCode());
        result = prime * result + ((getCoverUrl() == null) ? 0 : getCoverUrl().hashCode());
        result = prime * result + ((getMetadata() == null) ? 0 : getMetadata().hashCode());
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
        sb.append(", title=").append(title);
        sb.append(", originalTitle=").append(originalTitle);
        sb.append(", description=").append(description);
        sb.append(", duration=").append(duration);
        sb.append(", releaseDate=").append(releaseDate);
        sb.append(", country=").append(country);
        sb.append(", language=").append(language);
        sb.append(", coverUrl=").append(coverUrl);
        sb.append(", metadata=").append(metadata);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}