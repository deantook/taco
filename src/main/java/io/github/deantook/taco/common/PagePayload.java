package io.github.deantook.taco.common;

import com.baomidou.mybatisplus.core.metadata.IPage;
import java.util.List;

/**
 * @author dean
 */
public record PagePayload<T>(List<T> records, long total, long current, long size, long pages) {

    public static <T> PagePayload<T> from(IPage<T> page) {
        return new PagePayload<>(
            page.getRecords(),
            page.getTotal(),
            page.getCurrent(),
            page.getSize(),
            page.getPages());
    }
}
