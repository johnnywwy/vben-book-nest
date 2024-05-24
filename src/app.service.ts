import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return '你好啊啊哈哈哈哈哈';
  }

  // 测试
  test(): string {
    return 'test';
  }

  // 测试
  getData(params): string {
    if (!params.id || !Number.isInteger(params.id)) {
      throw new HttpException('必须包含id', HttpStatus.BAD_REQUEST);
    }
    return '拿到的 id: ' + params.id;
    // return 'data';
  }
}
