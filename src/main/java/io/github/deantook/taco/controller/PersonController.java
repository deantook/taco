package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.PagePayload;
import io.github.deantook.taco.common.PageQuery;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.Person;
import io.github.deantook.taco.service.PersonService;
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
@RequestMapping("/person")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping
    public ApiResult<PagePayload<Person>> page(
        @RequestParam(required = false) Long current,
        @RequestParam(required = false) Long size) {
        PageQuery q = PageQuery.of(current, size);
        Page<Person> p = new Page<>(q.current(), q.size());
        return ApiResult.ok(PagePayload.from(personService.page(p)));
    }

    @GetMapping("/{id}")
    public ApiResult<Person> getById(@PathVariable Long id) {
        Person person = personService.getById(id);
        if (person == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(person);
    }

    @PostMapping
    public ApiResult<Person> create(@RequestBody Person person) {
        person.setId(null);
        personService.save(person);
        return ApiResult.ok(person);
    }

    @PutMapping("/{id}")
    public ApiResult<Person> update(@PathVariable Long id, @RequestBody Person person) {
        person.setId(id);
        if (!personService.updateById(person)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(personService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Long id) {
        if (!personService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
