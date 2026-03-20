package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.Movie;
import io.github.deantook.taco.service.MovieService;
import io.github.deantook.taco.mapper.MovieMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【movie(电影表)】的数据库操作Service实现
* @createDate 2026-03-21 03:11:31
*/
@Service
public class MovieServiceImpl extends ServiceImpl<MovieMapper, Movie>
    implements MovieService{

}




