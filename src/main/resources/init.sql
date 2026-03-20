CREATE TABLE `user`
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',

    username      VARCHAR(100) NOT NULL UNIQUE COMMENT '用户名（唯一）',
    email         VARCHAR(255) NOT NULL UNIQUE COMMENT '邮箱（唯一）',

    password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希（加密存储）',

    avatar        VARCHAR(512)                DEFAULT NULL COMMENT '头像URL',

    bio           VARCHAR(512)                DEFAULT NULL COMMENT '个人简介',

    status        ENUM ('active', 'disabled') DEFAULT 'active' COMMENT '用户状态',

    created_at    DATETIME                    DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at    DATETIME                    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_email (email),
    INDEX idx_username (username)
) COMMENT ='用户表（ToC核心）';


CREATE TABLE book
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '书籍ID',

    title          VARCHAR(255) NOT NULL COMMENT '书名',
    original_title VARCHAR(255) DEFAULT NULL COMMENT '原始书名',

    description    TEXT COMMENT '简介',

    page_count     INT          DEFAULT NULL COMMENT '页数',
    publisher      VARCHAR(255) DEFAULT NULL COMMENT '出版社',

    publish_date   DATE         DEFAULT NULL COMMENT '出版日期',

    cover_url      VARCHAR(512) DEFAULT NULL COMMENT '封面图',

    metadata       JSON         DEFAULT NULL COMMENT '扩展信息（语言/版本等）',

    created_at     DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_title (title)
) COMMENT ='书籍表';

CREATE TABLE movie
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '电影ID',

    title          VARCHAR(255) NOT NULL COMMENT '电影名称',
    original_title VARCHAR(255) DEFAULT NULL COMMENT '原始名称',

    description    TEXT COMMENT '简介',

    duration       INT          DEFAULT NULL COMMENT '时长（分钟）',

    release_date   DATE         DEFAULT NULL COMMENT '上映日期',

    country        VARCHAR(100) DEFAULT NULL COMMENT '国家/地区',

    language       VARCHAR(100) DEFAULT NULL COMMENT '语言',

    cover_url      VARCHAR(512) DEFAULT NULL COMMENT '封面图',

    metadata       JSON         DEFAULT NULL COMMENT '扩展字段（票房/分级等）',

    created_at     DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_title (title),
    INDEX idx_release_date (release_date)
) COMMENT ='电影表';

CREATE TABLE tv_series
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '电视剧ID',

    title          VARCHAR(255) NOT NULL COMMENT '剧名',
    original_title VARCHAR(255)                 DEFAULT NULL COMMENT '原始剧名',

    description    TEXT COMMENT '简介',

    season_count   INT                          DEFAULT NULL COMMENT '总季数',
    episode_count  INT                          DEFAULT NULL COMMENT '总集数',

    release_date   DATE                         DEFAULT NULL COMMENT '首播日期',

    status         ENUM ('ongoing', 'finished') DEFAULT 'finished' COMMENT '连载状态',

    country        VARCHAR(100)                 DEFAULT NULL COMMENT '国家/地区',

    language       VARCHAR(100)                 DEFAULT NULL COMMENT '语言',

    cover_url      VARCHAR(512)                 DEFAULT NULL COMMENT '封面图',

    metadata       JSON                         DEFAULT NULL COMMENT '扩展字段',

    created_at     DATETIME                     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_title (title),
    INDEX idx_release_date (release_date),
    INDEX idx_status (status)
) COMMENT ='电视剧表';

CREATE TABLE anime_series
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '番剧ID',

    title          VARCHAR(255) NOT NULL COMMENT '番剧名称',
    original_title VARCHAR(255)                 DEFAULT NULL COMMENT '原名（日文等）',

    description    TEXT COMMENT '简介',

    episode_count  INT                          DEFAULT NULL COMMENT '总集数',

    release_date   DATE                         DEFAULT NULL COMMENT '开播日期',

    season         VARCHAR(50)                  DEFAULT NULL COMMENT '季度（如2024冬）',

    status         ENUM ('ongoing', 'finished') DEFAULT 'finished' COMMENT '连载状态',

    studio         VARCHAR(255)                 DEFAULT NULL COMMENT '制作公司',

    cover_url      VARCHAR(512)                 DEFAULT NULL COMMENT '封面图',

    metadata       JSON                         DEFAULT NULL COMMENT '扩展字段',

    created_at     DATETIME                     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at     DATETIME                     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_title (title),
    INDEX idx_release_date (release_date),
    INDEX idx_season (season)
) COMMENT ='番剧表';