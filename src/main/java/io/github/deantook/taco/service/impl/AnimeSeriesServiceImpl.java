package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.AnimeSeries;
import io.github.deantook.taco.service.AnimeSeriesService;
import io.github.deantook.taco.mapper.AnimeSeriesMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【anime_series(番剧表)】的数据库操作Service实现
* @createDate 2026-03-21 03:11:31
*/
@Service
public class AnimeSeriesServiceImpl extends ServiceImpl<AnimeSeriesMapper, AnimeSeries>
    implements AnimeSeriesService{

}




