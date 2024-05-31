import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/public.decorator';
import { wrapperResponse } from 'src/utils';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @ApiOperation({ summary: '创建新菜单' })
  create(@Body() createMenuDto: CreateMenuDto) {
    return wrapperResponse(
      this.menuService.create(createMenuDto),
      '创建菜单成功',
    );
  }

  @Get()
  @ApiOperation({ summary: '获取所有菜单' })
  findAll() {
    return wrapperResponse(this.menuService.findAll2(), '获取所有菜单');
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个菜单' })
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Put()
  @ApiOperation({ summary: '更新菜单' }) // 更新菜单
  update(@Body() updateMenuDto: UpdateMenuDto) {
    console.log('idddd1111111', updateMenuDto);
    return wrapperResponse(
      this.menuService.update(updateMenuDto),
      '更新菜单成功',
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单' })
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
