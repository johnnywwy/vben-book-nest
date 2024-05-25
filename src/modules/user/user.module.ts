import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([User])], // 导入其他模块
  controllers: [UserController],
  providers: [UserService],
  // exports: [UserService],
})
export class UserModule {}
