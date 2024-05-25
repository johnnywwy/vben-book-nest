import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: '用户名' })
  username: string;

  @ApiProperty({ example: 'password123', description: '密码' })
  password: string;

  @ApiProperty({ example: 'john@example.com', description: '电子邮件地址' })
  email: string;
}
