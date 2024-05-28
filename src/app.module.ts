import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: '123456',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true, //todo 生产环境请关闭
      logging: true,
    }),
    UserModule,
    AuthModule,
    BookModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
