package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.TvSeries;
import io.github.deantook.taco.service.TvSeriesService;
import io.github.deantook.taco.mapper.TvSeriesMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【tv_series(电视剧表)】的数据库操作Service实现
* @createDate 2026-03-21 03:11:31
*/
@Service
public class TvSeriesServiceImpl extends ServiceImpl<TvSeriesMapper, TvSeries>
    implements TvSeriesService{

}




