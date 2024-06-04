import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { wrapperResponse } from 'src/utils';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    // return wrapperResponse(
    //   this.bookRepository.save(createBookDto), // 保存到数据库
    // )
    return 'This action adds a new book';
  }

  findAll(params) {
    let { page = 1, pageSize = 5, title, author } = params;
    if (page <= 0) {
      page = 1;
    }
    const offset = (page - 1) * pageSize; // 计算偏移量
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .skip(offset) // 跳过前面的记录
      .take(pageSize); // 获取指定数量的记录

    // 如果存在标题参数，则添加标题过滤条件
    if (title) {
      queryBuilder.andWhere('book.title LIKE :title', { title: `%${title}%` });
    }

    // 如果存在作者参数，则添加作者过滤条件
    if (author) {
      queryBuilder.andWhere('book.author LIKE :author', {
        author: `%${author}%`,
      });
    }

    return wrapperResponse(
      queryBuilder.getMany(), // 执行查询
      '获取成功',
    );

    // return this.bookRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }
}
