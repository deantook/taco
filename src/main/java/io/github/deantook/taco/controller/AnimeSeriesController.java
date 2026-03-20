package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.PagePayload;
import io.github.deantook.taco.common.PageQuery;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.AnimeSeries;
import io.github.deantook.taco.service.AnimeSeriesService;
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
@RequestMapping("/anime-series")
@RequiredArgsConstructor
public class AnimeSeriesController {

    private final AnimeSeriesService animeSeriesService;

    @GetMapping
    public ApiResult<PagePayload<AnimeSeries>> page(
        @RequestParam(required = false) Long current,
        @RequestParam(required = false) Long size) {
        PageQuery q = PageQuery.of(current, size);
        Page<AnimeSeries> p = new Page<>(q.current(), q.size());
        return ApiResult.ok(PagePayload.from(animeSeriesService.page(p)));
    }

    @GetMapping("/{id}")
    public ApiResult<AnimeSeries> getById(@PathVariable Long id) {
        AnimeSeries series = animeSeriesService.getById(id);
        if (series == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(series);
    }

    @PostMapping
    public ApiResult<AnimeSeries> create(@RequestBody AnimeSeries series) {
        series.setId(null);
        animeSeriesService.save(series);
        return ApiResult.ok(series);
    }

    @PutMapping("/{id}")
    public ApiResult<AnimeSeries> update(@PathVariable Long id, @RequestBody AnimeSeries series) {
        series.setId(id);
        if (!animeSeriesService.updateById(series)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(animeSeriesService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Long id) {
        if (!animeSeriesService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
