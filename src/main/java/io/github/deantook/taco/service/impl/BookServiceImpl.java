package io.github.deantook.taco.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.github.deantook.taco.domain.Book;
import io.github.deantook.taco.service.BookService;
import io.github.deantook.taco.mapper.BookMapper;
import org.springframework.stereotype.Service;

/**
* @author dean
* @description 针对表【book(书籍表)】的数据库操作Service实现
* @createDate 2026-03-21 03:11:31
*/
@Service
public class BookServiceImpl extends ServiceImpl<BookMapper, Book>
    implements BookService{

}




