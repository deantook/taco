package io.github.deantook.taco.controller;

import io.github.deantook.taco.common.ApiResult;
import io.github.deantook.taco.common.ResultCode;
import io.github.deantook.taco.domain.Role;
import io.github.deantook.taco.service.RoleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author dean
 */
@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ApiResult<List<Role>> list() {
        return ApiResult.ok(roleService.list());
    }

    @GetMapping("/{id}")
    public ApiResult<Role> getById(@PathVariable Integer id) {
        Role role = roleService.getById(id);
        if (role == null) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(role);
    }

    @PostMapping
    public ApiResult<Role> create(@RequestBody Role role) {
        role.setId(null);
        roleService.save(role);
        return ApiResult.ok(role);
    }

    @PutMapping("/{id}")
    public ApiResult<Role> update(@PathVariable Integer id, @RequestBody Role role) {
        role.setId(id);
        if (!roleService.updateById(role)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok(roleService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ApiResult<Void> delete(@PathVariable Integer id) {
        if (!roleService.removeById(id)) {
            return ApiResult.fail(ResultCode.NOT_FOUND);
        }
        return ApiResult.ok();
    }
}
