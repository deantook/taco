package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 电视剧表
 * @author dean
 * @TableName tv_series
 */
@TableName(value ="tv_series")
@Data
public class TvSeries {
    /**
     * 电视剧ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 剧名
     */
    private String title;

    /**
     * 原始剧名
     */
    private String originalTitle;

    /**
     * 简介
     */
    private String description;

    /**
     * 总季数
     */
    private Integer seasonCount;

    /**
     * 总集数
     */
    private Integer episodeCount;

    /**
     * 首播日期
     */
    private Date releaseDate;

    /**
     * 连载状态
     */
    private Object status;

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
     * 扩展字段
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
        TvSeries other = (TvSeries) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getOriginalTitle() == null ? other.getOriginalTitle() == null : this.getOriginalTitle().equals(other.getOriginalTitle()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getSeasonCount() == null ? other.getSeasonCount() == null : this.getSeasonCount().equals(other.getSeasonCount()))
            && (this.getEpisodeCount() == null ? other.getEpisodeCount() == null : this.getEpisodeCount().equals(other.getEpisodeCount()))
            && (this.getReleaseDate() == null ? other.getReleaseDate() == null : this.getReleaseDate().equals(other.getReleaseDate()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
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
        result = prime * result + ((getSeasonCount() == null) ? 0 : getSeasonCount().hashCode());
        result = prime * result + ((getEpisodeCount() == null) ? 0 : getEpisodeCount().hashCode());
        result = prime * result + ((getReleaseDate() == null) ? 0 : getReleaseDate().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
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
        sb.append(", seasonCount=").append(seasonCount);
        sb.append(", episodeCount=").append(episodeCount);
        sb.append(", releaseDate=").append(releaseDate);
        sb.append(", status=").append(status);
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