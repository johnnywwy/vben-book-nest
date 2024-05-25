import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  // UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from './public.decorator';
// import { Auth } from './entities/auth.entity'; // 假设你有一个 Auth 实体
// import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // @ApiOperation({ summary: '创建新认证记录' })
  // @ApiBody({ type: CreateAuthDto })
  // @ApiResponse({ status: 201, description: '认证记录已成功创建。', type: Auth })
  // @ApiResponse({ status: 400, description: '请求参数错误。' })
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // @ApiOperation({ summary: '获取所有认证记录' })
  // @ApiResponse({
  //   status: 200,
  //   description: '成功获取所有认证记录。',
  //   type: [Auth],
  // })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // @Public()
  // @ApiOperation({ summary: '获取指定ID的认证记录' })
  // @ApiResponse({ status: 200, description: '成功获取认证记录。', type: Auth })
  // @ApiResponse({ status: 404, description: '认证记录未找到。' })
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: '更新指定ID的认证记录' })
  // @ApiBody({ type: UpdateAuthDto })
  // @ApiResponse({ status: 200, description: '成功更新认证记录。', type: Auth })
  // @ApiResponse({ status: 404, description: '认证记录未找到。' })
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(id, updateAuthDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: '删除指定ID的认证记录' })
  // @ApiResponse({ status: 200, description: '成功删除认证记录。' })
  // @ApiResponse({ status: 404, description: '认证记录未找到。' })
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(id);
  // }

  @Post('login')
  @Public()
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: '登录成功。' })
  @ApiResponse({ status: 401, description: '登录失败，用户名或密码错误。' })
  async login(@Body() params: { username: string; password: string }) {
    await this.authService.login(params.username, params.password);
    return 'login';
  }
}
