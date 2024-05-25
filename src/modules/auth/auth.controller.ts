import {
  Controller,
  // Get,
  Post,
  Body,
  UseFilters,
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
import { HttpExceptionFilter } from 'src/exception/http-exception.filter';
import { error, success } from 'src/utils';
// import { Auth } from './entities/auth.entity'; // 假设你有一个 Auth 实体
// import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('认证管理')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    schema: {
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 201, description: '登录成功。' })
  @ApiResponse({ status: 401, description: '登录失败，用户名或密码错误。' })
  async login(@Body() params: { username: string; password: string }) {
    return this.authService
      .login(params.username, params.password)
      .then((data) => success(data, '登录成功'))
      .catch((err) => error(err.message));
  }
}
