import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    console.log('createMenuDto', createMenuDto);
    return await this.menuRepository.save(createMenuDto);
  }

  findAll() {
    const str = `
    [{
      "path": "/:path(.*)*",
      "name": "PageNotFound",
      "meta": {
        "title": "ErrorPage",
        "hideBreadcrumb": true,
        "hideMenu": true
      },
      "children": [{
        "path": "/:path(.*)*",
        "name": "PageNotFound",
        "meta": {
          "title": "ErrorPage",
          "hideBreadcrumb": true,
          "hideMenu": true
        }
      }]
    }, {
      "path": "/about",
      "name": "About",
      "redirect": "/about/index",
      "meta": {
        "hideChildrenInMenu": true,
        "icon": "simple-icons:about-dot-me",
        "title": "routes.dashboard.about",
        "orderNo": 100000
      },
      "children": [{
        "path": "index",
        "name": "AboutPage",
        "meta": {
          "title": "routes.dashboard.about",
          "icon": "simple-icons:about-dot-me",
          "hideMenu": true
        }
      }]
    }, 
    {
      "path": "/dashboard",
      "name": "Dashboard",
      "redirect": "/dashboard/analysis",
      "meta": {
        "orderNo": 10,
        "icon": "ion:grid-outline",
        "title": "routes.dashboard.dashboard"
      },
      "children": [{
        "path": "analysis",
        "name": "Analysis",
        "meta": {
          "title": "routes.dashboard.analysis"
        }
      }, 
      {
        "path": "workbench",
        "name": "Workbench",
        "meta": {
          "title": "工作台"
        }
      }, 
      {
        "path": "front",
        "name": "PermissionFrontDemo",
        "meta": {
          "title": "routes.demo.permission.front"
        },
        "children": [{
          "path": "page",
          "name": "FrontPageAuth",
          "meta": {
            "title": "routes.demo.permission.frontPage"
          }
        }, {
          "path": "btn",
          "name": "FrontBtnAuth",
          "meta": {"title": "routes.demo.permission.frontBtn"}
        }, {
          "path": "auth-pageA",
          "name": "FrontAuthPageA",
          "meta": {"title": "routes.demo.permission.frontTestA","roles": ["super"]}
        }, {
          "path": "auth-pageB",
          "name": "FrontAuthPageB",
          "meta": {"title": "routes.demo.permission.frontTestB","roles": ["test"]}
        }]
      }]
    },
    {
      "path":"/permission",
      "name":"Permission",
      "redirect":"/permission/menu",
      "meta":{"orderNo":15,"icon":"ion:key-outline","title":"routes.demo.permission.permission"},
      "children":[
          {
              "path":"menu",
              "name":"PermissionMenu",
              "meta":{"title":"routes.demo.permission.menu"}
          }
      ]
    }, 
    {
      "path": "/setup",
      "name": "SetupDemo",
      "redirect": "/setup/index",
      "meta": {
        "orderNo": 90000,
        "hideChildrenInMenu": true,
        "icon": "whh:paintroll",
        "title": "routes.demo.setup.page"
      },
      "children": [{
        "path": "index",
        "name": "SetupDemoPage",
        "meta": {
          "title": "routes.demo.setup.page",
          "icon": "whh:paintroll",
          "hideMenu": true
        }
      }]
    }]  
    `;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(str));
      }, 1000);
    });
  }

  findAll2() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(updateMenuDto: UpdateMenuDto) {
    const { id, ...rest } = updateMenuDto;
    return this.menuRepository.update(id, rest);
    // return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
