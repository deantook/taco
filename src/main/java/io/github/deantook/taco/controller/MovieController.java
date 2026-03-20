package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.PagePayload;
import io.github.deantook.taco.common.PageQuery;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.Movie;
import io.github.deantook.taco.service.MovieService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author dean
 */
@RestController
@RequestMapping("/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ApiResult<PagePayload<Movie>> page(
        @RequestParam(required = false) Long current,
        @RequestParam(required = false) Long size) {
        PageQuery q = PageQuery.of(current, size);
        Page<Movie> p = new Page<>(q.current(), q.size());
        return ApiResult.ok(PagePayload.from(movieService.page(p)));
    }

    @GetMapping("/{id}")
    public ApiResult<Movie> getById(@PathVariable Long id) {
        Movie movie = movieService.getById(id);
        if (movie == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(movie);
    }

    @PostMapping
    public ApiResult<Movie> create(@RequestBody Movie movie) {
        movie.setId(null);
        movieService.save(movie);
        return ApiResult.ok(movie);
    }

    @PutMapping("/{id}")
    public ApiResult<Movie> update(@PathVariable Long id, @RequestBody Movie movie) {
        movie.setId(id);
        if (!movieService.updateById(movie)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(movieService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Long id) {
        if (!movieService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
