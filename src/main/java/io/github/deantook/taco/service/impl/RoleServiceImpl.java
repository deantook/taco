package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.Role;
import io.github.deantook.taco.service.RoleService;
import io.github.deantook.taco.mapper.RoleMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【role(角色类型表（可扩展）)】的数据库操作Service实现
* @createDate 2026-03-21 03:31:36
*/
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role>
    implements RoleService{

}




