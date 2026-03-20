package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.UserProgress;
import io.github.deantook.taco.service.UserProgressService;
import io.github.deantook.taco.mapper.UserProgressMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【user_progress(用户进度表)】的数据库操作Service实现
* @createDate 2026-03-21 03:35:18
*/
@Service
public class UserProgressServiceImpl extends ServiceImpl<UserProgressMapper, UserProgress>
    implements UserProgressService{

}




