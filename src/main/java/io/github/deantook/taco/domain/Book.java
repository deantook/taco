package io.github.deantook.taco.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.util.Date;
import lombok.Data;

/**
 * 书籍表
 * @author dean
 * @TableName book
 */
@TableName(value ="book")
@Data
public class Book {
    /**
     * 书籍ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 书名
     */
    private String title;

    /**
     * 原始书名
     */
    private String originalTitle;

    /**
     * 简介
     */
    private String description;

    /**
     * 页数
     */
    private Integer pageCount;

    /**
     * 出版社
     */
    private String publisher;

    /**
     * 出版日期
     */
    private Date publishDate;

    /**
     * 封面图
     */
    private String coverUrl;

    /**
     * 扩展信息（语言/版本等）
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
        Book other = (Book) that;
        return (this.getId() == null ? other.getId() == null : this.getId().equals(other.getId()))
            && (this.getTitle() == null ? other.getTitle() == null : this.getTitle().equals(other.getTitle()))
            && (this.getOriginalTitle() == null ? other.getOriginalTitle() == null : this.getOriginalTitle().equals(other.getOriginalTitle()))
            && (this.getDescription() == null ? other.getDescription() == null : this.getDescription().equals(other.getDescription()))
            && (this.getPageCount() == null ? other.getPageCount() == null : this.getPageCount().equals(other.getPageCount()))
            && (this.getPublisher() == null ? other.getPublisher() == null : this.getPublisher().equals(other.getPublisher()))
            && (this.getPublishDate() == null ? other.getPublishDate() == null : this.getPublishDate().equals(other.getPublishDate()))
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
        result = prime * result + ((getPageCount() == null) ? 0 : getPageCount().hashCode());
        result = prime * result + ((getPublisher() == null) ? 0 : getPublisher().hashCode());
        result = prime * result + ((getPublishDate() == null) ? 0 : getPublishDate().hashCode());
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
        sb.append(", pageCount=").append(pageCount);
        sb.append(", publisher=").append(publisher);
        sb.append(", publishDate=").append(publishDate);
        sb.append(", coverUrl=").append(coverUrl);
        sb.append(", metadata=").append(metadata);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append("]");
        return sb.toString();
    }
}