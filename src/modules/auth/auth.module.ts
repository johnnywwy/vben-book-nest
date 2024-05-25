import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  // imports: [UserModule],
  controllers: [AuthController],

  //第一种 局部认证 在controller中使用 useGuards(AuthGuard)
  // providers: [AuthService],

  //第二种 全局认证 在module中使用 { provide: APP_GUARD}
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ], //第二种在module中使用
})
export class AuthModule {}
