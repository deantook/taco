CREATE TABLE person
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '人物ID',

    name          VARCHAR(255) NOT NULL COMMENT '姓名（展示名）',
    original_name VARCHAR(255) DEFAULT NULL COMMENT '原名（外文名）',

    avatar        VARCHAR(512) DEFAULT NULL COMMENT '头像URL',

    bio           TEXT COMMENT '人物简介',

    aliases       JSON         DEFAULT NULL COMMENT '别名（JSON数组，如["周星驰","Stephen Chow"]）',

    gender        ENUM('male', 'female', 'other', 'unknown') DEFAULT 'unknown' COMMENT '性别',

    birth_date    DATE         DEFAULT NULL COMMENT '出生日期',

    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at    DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX         idx_name (name),
    INDEX         idx_original_name (original_name)
) COMMENT='人物表（演员/导演/作者等统一实体）';

CREATE TABLE role
(
    id          INT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID',

    code        VARCHAR(50)  NOT NULL UNIQUE COMMENT '角色编码（actor/director等）',

    name        VARCHAR(100) NOT NULL COMMENT '角色名称（演员/导演/编剧等）',

    category    ENUM('cast', 'crew') NOT NULL COMMENT '分类：cast=演职人员（台前），crew=幕后',

    description VARCHAR(255) DEFAULT NULL COMMENT '角色说明',

    created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    INDEX       idx_category (category)
) COMMENT='角色类型表（可扩展）';

CREATE TABLE credit
(
    id             BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '关系ID',

    content_type   ENUM('book', 'movie', 'tv', 'anime') NOT NULL COMMENT '内容类型',

    content_id     BIGINT NOT NULL COMMENT '内容ID（对应books/movies等表）',

    person_id      BIGINT NOT NULL COMMENT '人物ID',

    role_id        INT    NOT NULL COMMENT '角色类型ID',

    sub_role       VARCHAR(100) DEFAULT NULL COMMENT '细分角色（如主演/原作/客串等）',

    character_name VARCHAR(255) DEFAULT NULL COMMENT '饰演角色名（演员/配音专用）',

    `order`        INT          DEFAULT NULL COMMENT '排序（演员表顺序，越小越靠前）',

    extra          JSON         DEFAULT NULL COMMENT '扩展字段（奖项/备注等）',

    created_at     DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',

    -- 外键约束
    CONSTRAINT fk_credit_person FOREIGN KEY (person_id) REFERENCES person (id),
    CONSTRAINT fk_credit_role FOREIGN KEY (role_id) REFERENCES role (id),

    -- 索引设计（非常关键）
    INDEX          idx_content (content_type, content_id),
    INDEX          idx_person (person_id),
    INDEX          idx_role (role_id),

    -- 防重复（同一作品+人物+角色）
    UNIQUE KEY uniq_credit (
        content_type,
        content_id,
        person_id,
        role_id,
        sub_role
        )
) COMMENT='演职人员关系表（系统核心关系层）';