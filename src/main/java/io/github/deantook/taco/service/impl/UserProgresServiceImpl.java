package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.UserProgres;
import io.github.deantook.taco.service.UserProgresService;
import io.github.deantook.taco.mapper.UserProgresMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【user_progres(用户进度表)】的数据库操作Service实现
* @createDate 2026-03-21 03:35:18
*/
@Service
public class UserProgresServiceImpl extends ServiceImpl<UserProgresMapper, UserProgres>
    implements UserProgresService{

}




