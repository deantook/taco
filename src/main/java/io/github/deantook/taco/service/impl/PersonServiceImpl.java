package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.Person;
import io.github.deantook.taco.service.PersonService;
import io.github.deantook.taco.mapper.PersonMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【person(人物表（演员/导演/作者等统一实体）)】的数据库操作Service实现
* @createDate 2026-03-21 03:31:29
*/
@Service
public class PersonServiceImpl extends ServiceImpl<PersonMapper, Person>
    implements PersonService{

}




