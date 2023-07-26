import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {

    constructor(
        private menusService: MenusService
    ){}

    // @Get()
    // MenuController() {
    //     return this.menusService.getMenus();
    // }

    @Get()
    async findMenuByUrl(@Query('url') url: string) {
        // call method
        const menu = await this.menusService.findMenuByUrl(url)
        if (!menu) {
            throw new NotFoundException('Menu not found!')
        }
        return menu
    }
}
