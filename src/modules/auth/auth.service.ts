import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {} // private readonly userService: UserService

  // 登录
  async login(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    console.log('有咩有用户', user);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user && user.password !== password) {
      throw new UnauthorizedException('用户名或密码错误');
    }
  }
}
