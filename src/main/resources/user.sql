CREATE TABLE user_item_statu
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',

    user_id      BIGINT NOT NULL COMMENT '用户ID',

    content_type ENUM('book', 'movie', 'tv', 'anime') NOT NULL COMMENT '内容类型',
    content_id   BIGINT NOT NULL COMMENT '内容ID',

    status       ENUM('wishlist', 'doing', 'done', 'on_hold', 'dropped') NOT NULL COMMENT '状态（想看/进行中/完成/搁置/弃坑）',

    started_at   DATETIME DEFAULT NULL COMMENT '开始时间（进入doing）',
    finished_at  DATETIME DEFAULT NULL COMMENT '完成时间',

    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    CONSTRAINT fk_user_status_user FOREIGN KEY (user_id) REFERENCES user (id),

    UNIQUE KEY uniq_user_item (user_id, content_type, content_id),

    INDEX        idx_user (user_id),
    INDEX        idx_content (content_type, content_id),
    INDEX        idx_status (status)
) COMMENT='用户作品状态表';

CREATE TABLE user_progres
(
    id               BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',

    user_id          BIGINT NOT NULL COMMENT '用户ID',

    content_type     ENUM('book', 'movie', 'tv', 'anime') NOT NULL COMMENT '内容类型',
    content_id       BIGINT NOT NULL COMMENT '内容ID',

    progress_percent DECIMAL(5, 2) DEFAULT 0 COMMENT '进度百分比（0-100）',

    current_value    INT           DEFAULT NULL COMMENT '当前进度（页数/第几集）',
    total_value      INT           DEFAULT NULL COMMENT '总量（总页数/总集数）',

    last_action_at   DATETIME      DEFAULT NULL COMMENT '最近一次观看/阅读时间',

    created_at       DATETIME      DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at       DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    CONSTRAINT fk_user_progress_user FOREIGN KEY (user_id) REFERENCES user (id),

    UNIQUE KEY uniq_user_progress (user_id, content_type, content_id),

    INDEX            idx_user (user_id),
    INDEX            idx_content (content_type, content_id)
) COMMENT='用户进度表';

CREATE TABLE user_review
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',

    user_id      BIGINT NOT NULL COMMENT '用户ID',

    content_type ENUM('book', 'movie', 'tv', 'anime') NOT NULL COMMENT '内容类型',
    content_id   BIGINT NOT NULL COMMENT '内容ID',

    rating       DECIMAL(3, 1) DEFAULT NULL COMMENT '评分（0-10，可带1位小数）',

    short_review VARCHAR(512)  DEFAULT NULL COMMENT '短评',

    long_review  TEXT COMMENT '长评',

    is_spoiler   BOOLEAN       DEFAULT FALSE COMMENT '是否含剧透',

    created_at   DATETIME      DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at   DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    CONSTRAINT fk_user_review_user FOREIGN KEY (user_id) REFERENCES user (id),

    UNIQUE KEY uniq_user_review (user_id, content_type, content_id),

    INDEX        idx_user (user_id),
    INDEX        idx_content (content_type, content_id),
    INDEX        idx_rating (rating)
) COMMENT='用户评价表';