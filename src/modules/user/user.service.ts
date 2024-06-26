import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} // private readonly userRepository: Repository<User>

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    // 写入数据库
    const res = this.userRepository.save(createUserDto);
    console.log('写入数据库', res);
    return res;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    console.log('id', id);

    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }
}
