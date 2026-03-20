package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.Credit;
import io.github.deantook.taco.service.CreditService;
import io.github.deantook.taco.mapper.CreditMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【credit(演职人员关系表（系统核心关系层）)】的数据库操作Service实现
* @createDate 2026-03-21 03:31:39
*/
@Service
public class CreditServiceImpl extends ServiceImpl<CreditMapper, Credit>
    implements CreditService{

}




