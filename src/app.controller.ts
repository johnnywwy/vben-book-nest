import {
  Controller,
  Get,
  Param,
  // UseFilters
} from '@nestjs/common';
import { AppService } from './app.service';
// import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/test')
  // test(): string {
  //   return this.appService.test();
  // }

  // @Get('/data/:id')
  // // @UseFilters(new HttpExceptionFilter())
  // getData(@Param() params): string {
  //   return this.appService.getData(params);
  // }
}
