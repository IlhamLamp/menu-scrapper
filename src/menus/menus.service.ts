import { Injectable } from '@nestjs/common';
import { Category } from './category.model';
import * as puppeteer from 'puppeteer';

@Injectable()
export class MenusService {

    async getMenus() {
        const URL = 'https://bkdelivery.co.id/menus/'
        const browser = await puppeteer.launch({
            headless: false
        })
        const page = await browser.newPage()
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        })

        const results = await page.evaluate(() => {
            const layout = document.querySelector('')
        })
    }

    private readonly category: Category[] = [
        {id: '1', name: 'A', url: 'kings-chicken-rasa-baru/'},
        {id: '2', name: 'B', url: 'special-menu/'},
        {id: '3', name: 'C', url: '3-cheese-limited-time/'},
        {id: '4', name: 'D', url: 'whopper-wednesday/'},
        {id: '5', name: 'E', url: 'bk-app-exclusive/'},
        {id: '6', name: 'F', url: 'cheese-burger-favorit/'},
        {id: '7', name: 'G', url: 'cheese-whopper-2/'},
        {id: '8', name: 'H', url: 'gold-collection/'},
        {id: '9', name: 'I', url: 'kids-meal/'},
        {id: '10', name: 'J', url: 'side-dessert/'},
        {id: '11', name: 'K', url: 'beverages/'},
        {id: '12', name: 'L', url: 'king-deals/'},
        {id: '13', name: 'M', url: 'kupon-juli-3/'},
    ]

    async findMenuByUrl(url: string): Promise<Category> {
        return this.category.find((c) => c.url === url)
    }
}
