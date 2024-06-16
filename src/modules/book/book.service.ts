import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { wrapperResponse } from 'src/utils';

import * as fs from 'fs';
import * as path from 'path';
import Epubbook from './epub-book';

// const desPath = 'C:\\Users\\Administrator\\Desktop\\nginx\\html\\upload'; pc

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    // return wrapperResponse(
    //   this.bookRepository.save(z), // 保存到数据库
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

    return queryBuilder.getMany();

    // return this.bookRepository.find();
  }

  async countBookList(params: any = {}) {
    const { title = '', author = '' } = params;
    let where = 'where 1=1';
    if (title) {
      where += ` AND title LIKE '%${title}%'`;
    }
    if (author) {
      where += ` AND author LIKE '%${author}%'`;
    }
    // const categoryAuth = await this.getCategoryAuth(userid);
    // if (categoryAuth.length > 0) {
    //   where += ` AND categoryText IN (${categoryAuth.join(',')})`;
    // }
    const sql = `select count(*) as count from book ${where}`;
    return this.bookRepository.query(sql);
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

  uploadBook(file) {
    // console.log('我是文件', file);
    const destPath = 'C:\\Users\\Administrator\\Desktop\\nginx\\html\\upload'; //pc todo
    // const destPath = '/opt/homebrew/var/www/upload'; //mac todo

    fs.writeFileSync(path.resolve(destPath, file.originalname), file.buffer);

    // 电子书解析

    this.parseBook(destPath, file);

    return Promise.resolve().then(() => ({
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      minetype: file.mimetype,
      dir: destPath,
    }));
  }

  parseBook(bookPath, file) {
    // 电子书解析
    const epub = new Epubbook(bookPath, file);
    epub.parse();
  }
}
