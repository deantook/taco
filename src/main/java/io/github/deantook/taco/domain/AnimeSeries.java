package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 番剧表
 * @author dean
 * @TableName anime_series
 */
@TableName(value ="anime_series")
@Data
public class AnimeSeries {
    /**
     * 番剧ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 番剧名称
     */
    private String title;

    /**
     * 原名（日文等）
     */
    private String originalTitle;

    /**
     * 简介
     */
    private String description;

    /**
     * 总集数
     */
    private Integer episodeCount;

    /**
     * 开播日期
     */
    private Date releaseDate;

    /**
     * 季度（如2024冬）
     */
    private String season;

    /**
     * 连载状态
     */
    private Object status;

    /**
     * 制作公司
     */
    private String studio;

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
        AnimeSeries other = (AnimeSeries) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getOriginalTitle() == null ? other.getOriginalTitle() == null : this.getOriginalTitle().equals(other.getOriginalTitle()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getEpisodeCount() == null ? other.getEpisodeCount() == null : this.getEpisodeCount().equals(other.getEpisodeCount()))
            && (this.getReleaseDate() == null ? other.getReleaseDate() == null : this.getReleaseDate().equals(other.getReleaseDate()))
            && (this.getSeason() == null ? other.getSeason() == null : this.getSeason().equals(other.getSeason()))
            && (this.getStatus() == null ? other.getStatus() == null : this.getStatus().equals(other.getStatus()))
            && (this.getStudio() == null ? other.getStudio() == null : this.getStudio().equals(other.getStudio()))
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
        result = prime * result + ((getEpisodeCount() == null) ? 0 : getEpisodeCount().hashCode());
        result = prime * result + ((getReleaseDate() == null) ? 0 : getReleaseDate().hashCode());
        result = prime * result + ((getSeason() == null) ? 0 : getSeason().hashCode());
        result = prime * result + ((getStatus() == null) ? 0 : getStatus().hashCode());
        result = prime * result + ((getStudio() == null) ? 0 : getStudio().hashCode());
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
        sb.append(", episodeCount=").append(episodeCount);
        sb.append(", releaseDate=").append(releaseDate);
        sb.append(", season=").append(season);
        sb.append(", status=").append(status);
        sb.append(", studio=").append(studio);
        sb.append(", coverUrl=").append(coverUrl);
        sb.append(", metadata=").append(metadata);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}