package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.UserReview;
import io.github.deantook.taco.service.UserReviewService;
import io.github.deantook.taco.mapper.UserReviewMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【user_review(用户评价表)】的数据库操作Service实现
* @createDate 2026-03-21 03:35:18
*/
@Service
public class UserReviewServiceImpl extends ServiceImpl<UserReviewMapper, UserReview>
    implements UserReviewService{

}




