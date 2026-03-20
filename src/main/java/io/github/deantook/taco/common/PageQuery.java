package io.github.deantook.taco.common;

/**
 * @author dean
 */
public record PageQuery(long current, long size) {

    public static PageQuery of(Long current, Long size) {
        long c = (current == null || current < 1) ? 1 : current;
        long s = (size == null || size < 1) ? 10 : Math.min(size, 100);
        return new PageQuery(c, s);
    }
}
