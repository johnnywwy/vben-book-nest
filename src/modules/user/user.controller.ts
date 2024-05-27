import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { wrapperResponse } from '../../utils/index';
// import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('用户管理')
@Controller('user')
// @UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建新用户' })
  @ApiResponse({ status: 201, description: '用户已成功创建。', type: User })
  @ApiResponse({ status: 400, description: '请求参数错误。' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '成功获取所有用户。', type: [User] })
  findAll() {
    return this.userService.findAll();
  }

  @Get('info')
  getUserInfo(@Req() request) {
    console.log('呜啦啦啦啦啦', request.user);
    return wrapperResponse(
      this.userService.findByUsername(request.user.username),
      '获取用户信息成功',
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '获取指定ID的用户' })
  @ApiResponse({ status: 200, description: '成功获取用户。', type: User })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新指定ID的用户' })
  @ApiResponse({ status: 200, description: '成功更新用户。', type: User })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定ID的用户' })
  @ApiResponse({ status: 200, description: '成功删除用户。' })
  @ApiResponse({ status: 404, description: '用户未找到。' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

 
}
