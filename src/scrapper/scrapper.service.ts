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
            // Get layout and count menu
            const menuData = []
            const layout = document.querySelector('#section--1 > div')
            const menuCount = layout.childElementCount

            // 
            if(layout){
                for(let i=1; i<=menuCount; i++) {
                    const menu = layout.querySelector(`div:nth-child(${i})`)
                    if (menu) {
                        // Extract data from menu element and save it to the 'data' array
                        const title = menu.querySelector('h3')?.textContent || '';
                        const ingredients = menu.querySelector('p')?.textContent || '';
                        const priceElements = menu.querySelectorAll('span');
                        const price = priceElements[0]?.textContent || '';
                        const promo = priceElements[1]?.textContent || '';
                        const imageUrl = menu.querySelector('img')?.getAttribute('src') || '';
                        
                        // push
                        menuData.push({
                            id: i.toString(),
                            title: title,
                            ingredients: ingredients,
                            price: price,
                            promo: promo,
                            img: imageUrl,
                        })
                    } else {
                        console.log(`Menu (${i}) tidak ditemukan`)
                    }
                }
            }
        })

        // return 'my scrapper service is working 🚀';

    }
}
