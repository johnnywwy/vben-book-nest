import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: '0770a5fc8da9726e2e3b21da73463cf7c784063d',
      signOptions: { expiresIn: '24h' }, // token过期时间
    }),
  ],
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
