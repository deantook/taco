package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.PagePayload;
import io.github.deantook.taco.common.PageQuery;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.TvSeries;
import io.github.deantook.taco.service.TvSeriesService;
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
@RequestMapping("/tv-series")
@RequiredArgsConstructor
public class TvSeriesController {

    private final TvSeriesService tvSeriesService;

    @GetMapping
    public ApiResult<PagePayload<TvSeries>> page(
        @RequestParam(required = false) Long current,
        @RequestParam(required = false) Long size) {
        PageQuery q = PageQuery.of(current, size);
        Page<TvSeries> p = new Page<>(q.current(), q.size());
        return ApiResult.ok(PagePayload.from(tvSeriesService.page(p)));
    }

    @GetMapping("/{id}")
    public ApiResult<TvSeries> getById(@PathVariable Long id) {
        TvSeries series = tvSeriesService.getById(id);
        if (series == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(series);
    }

    @PostMapping
    public ApiResult<TvSeries> create(@RequestBody TvSeries series) {
        series.setId(null);
        tvSeriesService.save(series);
        return ApiResult.ok(series);
    }

    @PutMapping("/{id}")
    public ApiResult<TvSeries> update(@PathVariable Long id, @RequestBody TvSeries series) {
        series.setId(id);
        if (!tvSeriesService.updateById(series)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(tvSeriesService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Long id) {
        if (!tvSeriesService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
