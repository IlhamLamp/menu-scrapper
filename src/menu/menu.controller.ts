import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('menu')
export class MenuController {
    constructor (
        private readonly scrapperService: ScrapperService
    ) {}

    // root
    @Get()
    async getAllCategory() {
        return this.scrapperService.getAllCategory();
    }

    // :id
    @Get(':categoryId')
    async getMenuByCategoryId(@Param('categoryId') categoryId: string) {
        const categories = await this.scrapperService.getAllCategory();
        const ctg = categories.find((c) => c.id === categoryId)

        if (ctg) {
            const link = ctg.link
            return this.scrapperService.getMenuByCategories(link);
        } else {
            throw new NotFoundException('Menu not found!')
        }
    }
}
