import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';


@Injectable()
export class ScrapperService {
    async getDataViaPuppeteer() {
        const URL = 'https://gofood.co.id/en/bandung/restaurant/nasi-goreng-mas-lim-permata-9e430b79-c459-4f09-998c-53dbc8f0e7da'
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto(URL, {
            waitUntil: 'networkidle2'
        });

        await page.evaluate(() => {
            const menuList = []
            
            
        })

        // return 'my scrapper service is working 🚀';

    }
}
