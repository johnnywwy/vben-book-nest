import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { wrapperCountResponse, wrapperResponse } from 'src/utils';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('图书管理')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: '创建新图书' })
  @ApiResponse({ status: 201, description: '图书已成功创建。', type: Book })
  @ApiResponse({ status: 400, description: '请求参数错误。' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post('upload')
  @ApiOperation({ summary: '上传文件' })
  // @ApiResponse({ status: 200, description: '文件上传成功。', type: Book })
  // @ApiResponse({ status: 400, description: '请求参数错误。' })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'epub',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return wrapperResponse(this.bookService.uploadBook(file), '文件上传成功');
  }

  @Get()
  @ApiOperation({ summary: '获取所有图书' })
  @ApiResponse({ status: 200, description: '成功获取所有图书。', type: [Book] })
  findAll(@Query() params) {
    return wrapperCountResponse(
      this.bookService.findAll(params),
      this.bookService.countBookList(params),
      '获取图书列表成功111',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定ID的图书' })
  @ApiResponse({ status: 200, description: '成功获取图书。', type: Book })
  @ApiResponse({ status: 404, description: '图书未找到。' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新指定ID的图书' })
  @ApiResponse({ status: 200, description: '成功更新图书。', type: Book })
  @ApiResponse({ status: 404, description: '图书未找到。' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定ID的图书' })
  @ApiResponse({ status: 200, description: '成功删除图书。' })
  @ApiResponse({ status: 404, description: '图书未找到。' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
