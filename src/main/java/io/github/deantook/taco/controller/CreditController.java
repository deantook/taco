package io.github.deantook.taco.controller;

import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.Credit;
import io.github.deantook.taco.service.CreditService;
import java.util.List;
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
@RequestMapping("/credit")
@RequiredArgsConstructor
public class CreditController {

    private final CreditService creditService;

    /**
     * 列表；同时传 contentType 与 contentId 时按作品筛选（用于后台管理）。
     */
    @GetMapping
    public ApiResult<List<Credit>> list(
        @RequestParam(required = false) String contentType,
        @RequestParam(required = false) Long contentId) {
        if (contentType != null && contentId != null) {
            return ApiResult.ok(creditService.list(
                Wrappers.<Credit>lambdaQuery()
                    .eq(Credit::getContentType, contentType)
                    .eq(Credit::getContentId, contentId)
                    .orderByAsc(Credit::getOrder)));
        }
        return ApiResult.ok(creditService.list());
    }

    @GetMapping("/{id}")
    public ApiResult<Credit> getById(@PathVariable Long id) {
        Credit credit = creditService.getById(id);
        if (credit == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(credit);
    }

    @PostMapping
    public ApiResult<Credit> create(@RequestBody Credit credit) {
        credit.setId(null);
        creditService.save(credit);
        return ApiResult.ok(credit);
    }

    @PutMapping("/{id}")
    public ApiResult<Credit> update(@PathVariable Long id, @RequestBody Credit credit) {
        credit.setId(id);
        if (!creditService.updateById(credit)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(creditService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Long id) {
        if (!creditService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
